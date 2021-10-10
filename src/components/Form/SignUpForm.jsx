import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '.';
import { useAuth } from '../../context/AuthContext';
import Info from '../Info';
import Button from './Button';
import CheckBox from './CheckBox';
import TextInput from './TextInput';

const SignUpForm = ({ className }) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checkbox, setCheckbox] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const history = useHistory();
    const { signUp } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // VALIDATE PASSWORD
        if (password !== confirmPassword) {
            setError('Password Dont Match');
        }

        try {
            setError('');
            setLoading(true);
            await signUp(email, password, userName);
            history.push('/');
        } catch (err) {
            console.log(err);
            setLoading(false);
            setError('failed to create an account');
        }
    };

    return (
        <Form className={className} onSubmit={handleSubmit}>
            <TextInput
                required
                type="text"
                placeholder="Enter Name"
                icon="person"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <TextInput
                required
                type="email"
                placeholder="Enter Email"
                icon="alternate_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
                required
                type="password"
                placeholder="Enter Password"
                icon="lock"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextInput
                required
                type="password"
                placeholder="Confirm Password"
                icon="lock_clock"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <CheckBox
                required
                text="I agree to the Terms & Conditions"
                checked={checkbox}
                onChange={() => setCheckbox(!checkbox)}
            />

            {error && <p>{error}</p>}

            <Button disabled={loading} type="submit">
                Submit Now
            </Button>

            <Info page="signup" />
        </Form>
    );
};

export default SignUpForm;
