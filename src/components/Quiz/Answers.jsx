import React, { Fragment } from 'react';
import Classes from '../../styles/Answers.module.css';
import CheckBox from '../Form/CheckBox';

const Answers = ({ options = [], handleChange, disableInput }) => (
    <div className={Classes.answers}>
        {options.map((option, index) => (
            <Fragment key={Math.random()}>
                {!disableInput ? (
                    <CheckBox
                        className={Classes.answer}
                        text={option.title}
                        value={index}
                        id={index}
                        checked={option.checked}
                        onChange={(e) => handleChange(e)}
                    />
                ) : (
                    <CheckBox
                        className={`${Classes.answer} ${
                            option.correct ? Classes.correct : option.checked ? Classes.wrong : null
                        }`}
                        text={option.title}
                        id={index}
                        defaultChecked={option.correct}
                        disabled
                    />
                )}
            </Fragment>
        ))}
    </div>
);

export default Answers;
