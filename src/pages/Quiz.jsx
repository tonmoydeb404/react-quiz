import { getDatabase, ref, set } from 'firebase/database';
import _ from 'lodash';
import React, { useEffect, useReducer, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Answers from '../components/Quiz/Answers';
import MiniPlayer from '../components/Quiz/MiniPlayer';
import ProgressBar from '../components/Quiz/ProgressBar';
import { useAuth } from '../context/AuthContext';
import useQuestion from '../hooks/useQuestion';

const initialState = [];
const reducer = (state, actions) => {
    switch (actions.type) {
        case 'STATE_LOADED':
            return actions.value.map((q) => ({
                ...q,
                options: q.options.map((opt) => ({ ...opt, checked: false })),
            }));

        case 'SET_ANSWER':
            const questions = _.cloneDeep(state);

            questions[actions.qIndex].options[actions.optIndex].checked =
                !state[actions.qIndex].options[actions.optIndex].checked;

            return questions;
        default:
            return state;
    }
};

const Quiz = () => {
    const history = useHistory();

    // EXTRACT VIDEO TITLE FROM REACT ROUTER DOM
    const { location } = history;
    const { state } = location;
    const { videoTitle } = state;

    const { currentUser } = useAuth();
    const { id } = useParams();
    const { error, loading, question } = useQuestion(id);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [qna, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({
            type: 'STATE_LOADED',
            value: question,
        });
    }, [question]);

    useEffect(() => {
        document.title = `${videoTitle} - React Quiz`;
    }, [videoTitle]);

    // SUBMIT QUIZ
    const submitQuiz = async () => {
        const { uid } = currentUser;
        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`);

        await set(resultRef, { [id]: qna });

        history.push({
            pathname: `/result/${id}`,
            state: {
                qna,
            },
        });
    };

    // TOGGLE CHECKBOX
    const handleChange = (e) => {
        dispatch({
            type: 'SET_ANSWER',
            qIndex: currentQuestion,
            optIndex: parseInt(e.target.value, 10),
        });
    };

    // CHANGE QUESTION
    const nextQuestion = () => {
        if (qna.length > currentQuestion) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const prevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    // PROGRESS BAR
    const progress = () => ((currentQuestion + 1) / qna.length) * 100;

    if (loading && !error) {
        return <h6>loading...</h6>;
    }
    if (!loading && error) {
        return <h6>Something Went Wrong</h6>;
    }

    return (
        !loading &&
        !error &&
        qna.length > 0 && (
            <>
                <h1>{qna[currentQuestion].title}</h1>
                <h4>Question can have multiple answers</h4>

                <Answers
                    options={qna[currentQuestion].options}
                    handleChange={handleChange}
                    currentQuestion={currentQuestion}
                />
                <ProgressBar
                    next={nextQuestion}
                    prev={prevQuestion}
                    progress={progress()}
                    submitQuiz={submitQuiz}
                />
                <MiniPlayer videoId={id} videoTitle={videoTitle} />
            </>
        )
    );
};

export default Quiz;
