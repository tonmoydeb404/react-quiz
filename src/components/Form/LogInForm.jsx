import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '.';
import { useAuth } from '../../context/AuthContext';
import Info from '../Info';
import Button from './Button';
import TextInput from './TextInput';

const LogInForm = ({ className }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const history = useHistory();
    const { logIn } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await logIn(email, password);
            history.push('/');
        } catch (err) {
            console.log(err);
            setLoading(false);
            setError('failed to log in');
        }
    };

    return (
        <Form className={className} onSubmit={handleSubmit}>
            <TextInput
                type="email"
                placeholder="Enter Email"
                icon="alternate_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
                type="password"
                placeholder="Enter Password"
                icon="lock"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p>{error}</p>}

            <Button disabled={loading} type="submit">
                Login Now
            </Button>

            <Info page="login" />
        </Form>
    );
};

export default LogInForm;
