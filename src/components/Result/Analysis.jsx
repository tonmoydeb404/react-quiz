import React from 'react';
import Classes from '../../styles/Analysis.module.css';
import Question from './Question';

const Analysis = ({ point, total, answers = [] }) => (
    <div className={Classes.analysis}>
        <h1>Question Analysis</h1>
        <h4>
            You answerd {point} out of {total} questions correctly
        </h4>

        {answers.length &&
            answers.map((answer) => (
                <Question key={Math.random()} title={answer.title} options={answer.options} />
            ))}
    </div>
);

export default Analysis;
