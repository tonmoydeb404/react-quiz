import _ from 'lodash';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Analysis from '../components/Result/Analysis';
import Summary from '../components/Result/Summary';
import useAnswers from '../hooks/useAnswers';

const Result = () => {
    // EXTRACT QNA FROM REACT ROUTER DOM
    const { location } = useHistory();
    const { state } = location;
    const { qna } = state;

    const { id } = useParams();

    const { error, loading, answers } = useAnswers(id);

    useEffect(() => {
        document.title = 'Result - React Quiz';
    }, []);

    // CALCULATE POINT
    const calcPoint = () => {
        const answerIndex = [];
        const userAnswerIndex = [];
        let correct = 0;

        answers.forEach((q, qIndex) => {
            q.options.forEach((opt, optIndex) => {
                if (opt.correct) answerIndex.push(optIndex);
                if (qna[qIndex].options[optIndex].checked) {
                    userAnswerIndex.push(optIndex);
                    answers[qIndex].options[optIndex].checked = true;
                }
            });

            if (_.isEqual(answerIndex, userAnswerIndex)) correct += 1;
        });

        return correct * 5;
    };

    if (loading && !error) {
        return <h6>loading...</h6>;
    }
    if (!loading && error) {
        return <h6>Something Went Wrong</h6>;
    }

    return (
        <>
            <Summary point={calcPoint()} total={qna.length * 5} />
            <Analysis answers={answers} point={calcPoint()} total={qna.length * 5} />
        </>
    );
};

export default Result;
