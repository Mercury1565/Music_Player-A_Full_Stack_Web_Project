import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { AuthContainer, ErrorText } from "../styles/containers";
import { ThemeProvider } from "@emotion/react";
import { my_theme } from "../styles/theme";
import { AuthButton, AuthForm, AuthHeader, AuthInput, AuthLabel, NavigatorContainer, NavigatorP } from "../styles/auth";
import { useNavigate } from "react-router-dom";

const Login=() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, authError, loggedIn } = useSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'auth/loginRequest', payload: { email, password } });
    };

    useEffect(() => {
        if (loggedIn) {
            navigate('/'); // Navigate to the dashboard page or another route after successful login
        }
    }, [loggedIn, navigate]);

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
                        <AuthInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </AuthLabel>

                    <NavigatorContainer>
                        <p>Not Registered?</p>
                        <NavigatorP onClick={() => navigate('/signup')}>Signup</NavigatorP>
                    </NavigatorContainer>

                    <AuthButton type="submit">Login</AuthButton>
                </AuthForm>
                {authError && <ErrorText>*{authError}</ErrorText>}
            </AuthContainer>
        </ThemeProvider>
    );
}

export default Login;

