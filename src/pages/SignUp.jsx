import React, { useEffect } from 'react';
import SignUpForm from '../components/Form/SignUpForm';
import Illustration from '../components/Illustration';
import Classes from '../styles/SignUp.module.css';

const SignUp = () => {
    useEffect(() => {
        document.title = 'Signup - React Quiz';
    }, []);

    return (
        <>
            <h1>Create an account</h1>

            <div className="column">
                <Illustration />
                <SignUpForm className={Classes.signup} />
            </div>
        </>
    );
};

export default SignUp;
