import React, { Component } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

const WrapperDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const WelcomeInput = styled.p`
    margin: 1rem;
    white-space: nowrap;
`;

export default class Login extends Component {
    constructor(props) {
        super();

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.newaccount = this.newaccount.bind(this);
    }

    newaccount() {
        this.props.onNewAccount();
    }

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
                    <Button variant="primary" onClick={this.login}>Login</Button>
                    <Button variant="primary" onClick={this.newaccount}>Create Account</Button>
                </WrapperDiv>
            )
        } else {
            return(
                <WrapperDiv>
                    <WelcomeInput>Welcome, {this.props.username}</WelcomeInput>
                    <Button variant="primary" onClick={this.logout}>Logout</Button>
                </WrapperDiv>
            )
        }
    }

}