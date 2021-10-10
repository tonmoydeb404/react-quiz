import React from 'react';
import { Link } from 'react-router-dom';

const Info = ({ page }) => (
    <div className="info">
        {page === 'signup' ? (
            <>
                Already have an account? <Link to="login">Login</Link> instead.
            </>
        ) : (
            <>
                You have no account? <Link to="signup">Signup</Link> instead.
            </>
        )}
    </div>
);

export default Info;
