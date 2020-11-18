import React, { Component } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

const WrapperDiv = styled.div`
    display: inherit;
`;

const LoginInput = styled(InputGroup)`
    margin: 1rem;
`;

const WelcomeInput = styled.p`
    margin: 1rem;
`;

export default class Login extends Component {
    login() {
        this.props.onLogin();
    }

    logout() {
        this.props.onLogout();
    }

    render() {
        if (this.props.username === '') {
            return(
                <WrapperDiv>
                    <LoginInput size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="addon-user">Username</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl 
                            aria-label="Username"
                            aria-describedby="addon-user"
                        />
                    </LoginInput>
                    <LoginInput size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="addon-pass">Password</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl 
                            aria-label="Password"
                            aria-describedby="addon-pass"
                            type="password"
                        />
                    </LoginInput>
                    <Button variant="primary" onClick={this.login()}>Login</Button>
                </WrapperDiv>
            )
        } else {
            return(
                <WrapperDiv>
                    <WelcomeInput>Welcome, {this.props.username}</WelcomeInput>
                    <Button variant="primary" onClick={this.logout()}>Logout</Button>
                </WrapperDiv>
            )
        }
    }

}