/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Classes from '../../styles/Account.module.css';

const Account = () => {
    const { currentUser, logOut } = useAuth();

    return (
        <div className={Classes.account}>
            {currentUser ? (
                <>
                    <span className="material-icons-outlined" title="Account">
                        account_circle
                    </span>
                    {currentUser.displayName}
                    <span className="material-icons-outlined" title="Logout" onClick={logOut}>
                        logout
                    </span>
                </>
            ) : (
                <>
                    <Link to="/signup">Signup</Link>
                    <Link to="/login">Login</Link>
                </>
            )}
        </div>
    );
};

export default Account;
