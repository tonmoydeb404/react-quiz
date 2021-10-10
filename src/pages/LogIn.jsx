import React, { useEffect } from 'react';
import LogInForm from '../components/Form/LogInForm';
import Illustration from '../components/Illustration';
import Classes from '../styles/LogIn.module.css';

const LogIn = () => {
    useEffect(() => {
        document.title = 'Login - React Quiz';
    }, []);

    return (
        <>
            <h1>Log In To Your Account</h1>

            <div className="column">
                <Illustration />
                <LogInForm className={Classes.login} />
            </div>
        </>
    );
};

export default LogIn;
