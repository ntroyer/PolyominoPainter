import React, { Component } from 'react';
import { polyominos } from '../../../../data/polyominos';
import Button from 'react-bootstrap/Button';

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
            <Button variant="secondary" onClick={this.setRandomPolyomino}>Random Brush</Button>
        )
    }
}