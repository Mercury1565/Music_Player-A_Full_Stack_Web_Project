import { AuthContainer, ErrorText } from "../styles/containers";
import { ThemeProvider } from "@emotion/react";
import { my_theme } from "../styles/theme";
import { useState, useEffect } from "react";
import { AuthButton, AuthForm, AuthHeader, AuthInput, AuthLabel, NavigatorContainer, NavigatorP } from "../styles/auth";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const Signup=() => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, authError, loggedIn } = useSelector((state) => state.auth);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayErrorMessage, setDisplayErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            dispatch({ type: 'auth/signupRequest', payload: { name, email, password } });
        } else {
            setDisplayErrorMessage('Passwords do not match');
        }
    };

    useEffect(() => {
        if (loggedIn) {
            navigate('/'); 
        }
    }, [loggedIn, navigate]);


    return (
        <ThemeProvider theme={my_theme}>
            <AuthContainer>
                <AuthHeader>Signup</AuthHeader>
                <AuthForm onSubmit={handleSubmit}>
                    <AuthLabel>
                        Name:
                        <AuthInput type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </AuthLabel>
                    <AuthLabel>
                        Email:
                        <AuthInput type="text" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </AuthLabel>
                    <AuthLabel>
                        Password:
                        <AuthInput type="text" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </AuthLabel>
                    <AuthLabel>
                        Confirm Password:
                        <AuthInput type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </AuthLabel>

                    <NavigatorContainer>
                        <p>Already have an account?</p>
                        <NavigatorP onClick={() => navigate('/login')}>Login</NavigatorP>
                    </NavigatorContainer>
                    
                    <AuthButton type="submit">Signup</AuthButton>
                </AuthForm>
                {(authError || displayErrorMessage) && (
                    <ErrorText>
                        *{authError || displayErrorMessage}
                    </ErrorText>
                )}
            </AuthContainer>
        </ThemeProvider>
    );
}

export default Signup;

