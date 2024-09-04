import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { AuthContainer } from "../styles/containers";
import { ThemeProvider } from "@emotion/react";
import { my_theme } from "../styles/theme";
import { AuthButton, AuthForm, AuthHeader, AuthInput, AuthLabel } from "../styles/auth";
import { useNavigate } from "react-router-dom";

const Login=() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loading, authError, loggedIn } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'auth/loginRequest', payload: { email, password } });
    };

    useEffect(() => {
        if (loggedIn) {
            navigate('/'); // Navigate to the dashboard page or another route after successful login
        }
    }, [loggedIn, navigate]);

    const errorMessage = authError && typeof authError === 'object' ? authError.error || JSON.stringify(authError) : authError;

    return (
        <ThemeProvider theme={my_theme}>
            <AuthContainer>
                <AuthHeader>Login</AuthHeader>
                <AuthForm onSubmit={handleSubmit}>
                    <AuthLabel>
                        Email:
                        <AuthInput type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </AuthLabel>
                    <AuthLabel>
                        Password:
                        <AuthInput type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </AuthLabel>
                    <AuthButton type="submit">Login</AuthButton>
                </AuthForm>
                {errorMessage && <p style={{ color: 'pink' }}>*{errorMessage}</p>}
            </AuthContainer>
        </ThemeProvider>
    );
}

export default Login;

