import React, { Component } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

const WrapperDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginInput = styled(InputGroup)`
    margin: 1rem;
`;

const WelcomeInput = styled.p`
    margin: 1rem;
    white-space: nowrap;
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
                    <WelcomeInput>Login to save your images!</WelcomeInput>
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