import React from 'react';
import image from '../assets/images/signup.svg';
import Classes from '../styles/Illustration.module.css';

const Illustration = () => (
    <div className={Classes.illustration}>
        <img src={image} alt="Signup" />
    </div>
);

export default Illustration;
