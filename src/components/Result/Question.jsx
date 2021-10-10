/* eslint-disable no-unused-vars */
import React from 'react';
import Classes from '../../styles/Question.module.css';
import Answers from '../Quiz/Answers';

const Question = ({ title, options }) => (
    <div className={Classes.question}>
        <div className={Classes.qtitle}>
            <span className="material-icons-outlined"> help_outline </span>
            {title}
        </div>
        <Answers options={options} disableInput />
    </div>
);

export default Question;
