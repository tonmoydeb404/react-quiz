import React, { useRef } from 'react';
import Classes from '../../styles/ProgressBar.module.css';
import Button from '../Form/Button';

const ProgressBar = ({ next, prev, progress, submitQuiz }) => {
    const tooltipRef = useRef();

    const toggleTooltip = (bool) => {
        if (bool) {
            tooltipRef.current.style.left = `calc(${progress}% - 65px)`;
            tooltipRef.current.style.display = 'block';
        } else {
            tooltipRef.current.style.display = 'none';
        }
    };

    return (
        <div className={Classes.progressBar}>
            <div role="button" tabIndex="-1" className={Classes.backButton} onClick={prev}>
                <span className="material-icons-outlined"> arrow_back </span>
            </div>

            <div className={Classes.rangeArea}>
                <div className={Classes.tooltip} ref={tooltipRef}>
                    {`${progress}%`} Cimplete!
                </div>
                <div
                    role="progressbar"
                    className={Classes.rangeBody}
                    onMouseOver={() => toggleTooltip(true)}
                    onMouseOut={() => toggleTooltip(false)}
                    onBlur={() => toggleTooltip(false)}
                    onFocus={() => toggleTooltip(true)}
                >
                    <div className={Classes.progress} style={{ width: `${progress}%` }} />
                </div>
            </div>

            <Button
                className="next"
                icon="arrow_forward"
                onClick={progress === 100 ? submitQuiz : next}
            >
                {progress === 100 ? 'Submit Quiz' : 'Next Question'}
            </Button>
        </div>
    );
};

export default ProgressBar;
