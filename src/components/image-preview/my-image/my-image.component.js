import React, { Component } from 'react';
import styled from 'styled-components';
import Canvas from '../canvas/canvas.component';

const CanvasContainer = styled.div`
    display: inline-block;
    padding: 0.5rem;
`;

export default class MyImage extends Component {
    render() {
        // should render a load button, a save button and a canvas
        return(
            <CanvasContainer>
                <Canvas 
                    canvas={this.props.image}
                    boardX={this.props.boardX}
                    boardY={this.props.boardY}
                    canvasWidth={100}
                    canvasHeight={100} />
            </CanvasContainer>
        )
    }
}