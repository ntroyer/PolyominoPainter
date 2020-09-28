import React, { Component } from 'react';

export default class Canvas extends Component {
    constructor(props) {
        super();

        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        this.drawCanvas();
    }

    componentDidUpdate() {
        this.drawCanvas();
    }

    drawCanvas() {
        const playerSquares = this.props.playerSquares;
        const pixelWidth = 10;
        const pixelHeight = 10;
        const context = this.canvasRef.current.getContext("2d");

        Object.keys(playerSquares).map((index) => {
            const splitIndex = index.split(',');
            const y = Number(splitIndex[0]);
            const x = Number(splitIndex[1]);

            context.beginPath();
            context.fillStyle = playerSquares[index];
            context.fillRect(x * pixelWidth, y * pixelWidth, pixelWidth, pixelHeight);
            context.fill();
            return true;
        });
    }

    render() {
        return (
            <canvas width="200" height="200" ref={this.canvasRef} style={{border: "2px solid"}}></canvas>
        )
    }
}