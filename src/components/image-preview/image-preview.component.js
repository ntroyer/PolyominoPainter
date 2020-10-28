import React, { Component } from 'react';
import styled from 'styled-components';
import Canvas from './canvas/canvas.component';

const ImagePreviewCanvas = styled.div`
    width: 15%;
    background-color: #e9ecef;
    padding: 10px;
`;

export default class ImagePreview extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <ImagePreviewCanvas>
                <div style={{margin: "10px"}}>
                    Image Preview (right click to save)
                </div>
                <p>20 x 20</p>
                <Canvas 
                    canvas={this.props.canvas}
                    boardX={this.props.boardX}
                    boardY={this.props.boardY}
                    canvasWidth={20}
                    canvasHeight={20} />
                <p>200 x 200</p>
                <Canvas 
                    canvas={this.props.canvas}
                    boardX={this.props.boardX}
                    boardY={this.props.boardY}
                    canvasWidth={200}
                    canvasHeight={200} />
            </ImagePreviewCanvas>
        )
    }
}