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
        const pixelWidth = this.props.canvasWidth / this.props.boardX;
        const pixelHeight = this.props.canvasHeight / this.props.boardY;
        const context = this.canvasRef.current.getContext("2d");
        context.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight);

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
            <canvas 
                width={this.props.canvasWidth} 
                height={this.props.canvasHeight} 
                ref={this.canvasRef} 
                style={{border: "2px solid"}}></canvas>
        )
    }
}