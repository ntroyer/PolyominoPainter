import React, { Component } from 'react';
import styled from 'styled-components';
import { polyominos } from '../../../../data/polyominos';

export default class RandomPolyomino extends Component {
    constructor(props) {
        super();

        this.state = {
            polyominos: polyominos
        }

        this.setRandomPolyomino = this.setRandomPolyomino.bind(this);
    }

    setRandomPolyomino() {
        let random = Math.floor(Math.random() * polyominos.length);
        let polyo = typeof polyominos[random] != "undefined" ? polyominos[random] : polyominos[0];
        this.props.onPolyoChange(polyo.data);
    }

    render() {
        return (
            <button onClick={this.setRandomPolyomino}>Get Random Polyomino</button>
        )
    }
}