import React, { Component } from 'react';
import Canvas from './canvas/canvas.component';

export default class ImagePreview extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div style={{width: "15%"}}>
                <div style={{margin: "10px"}}>
                    Image Preview (right click to save)
                </div>
                <p>20 x 20</p>
                <Canvas 
                    playerSquares={this.props.playerSquares}
                    boardX={this.props.boardX}
                    boardY={this.props.boardY}
                    canvasWidth={20}
                    canvasHeight={20} />
                <p>200 x 200</p>
                <Canvas 
                    playerSquares={this.props.playerSquares}
                    boardX={this.props.boardX}
                    boardY={this.props.boardY}
                    canvasWidth={200}
                    canvasHeight={200} />
            </div>
        )
    }
}