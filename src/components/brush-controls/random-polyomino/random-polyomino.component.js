import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

export default class RandomPolyomino extends Component {
    constructor(props) {
        super();
        
        this.setRandomPolyomino = this.setRandomPolyomino.bind(this);
    }

    setRandomPolyomino() {
        let random = Math.floor(Math.random() * this.props.polyominos.length);
        let polyo = typeof this.props.polyominos[random] != "undefined" ? this.props.polyominos[random] : this.props.polyominos[0];
        this.props.onPolyoChange(polyo.data);
    }

    render() {
        return (
            <Button variant="secondary" onClick={this.setRandomPolyomino}>Random Brush</Button>
        )
    }
}