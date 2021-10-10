import React from 'react';
import image from '../../assets/images/success.png';
import Classes from '../../styles/Summary.module.css';

const Summary = ({ point, total }) => (
    <div className={Classes.summary}>
        <div className={Classes.point}>
            <p className={Classes.score}>
                Your score is <br />
                {point} out of {total}
            </p>
        </div>

        <div className={Classes.badge}>
            <img src={image} alt="Success" />
        </div>
    </div>
);

export default Summary;
