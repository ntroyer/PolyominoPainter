import React, { Component } from 'react';
import styled from 'styled-components';
import Canvas from '../canvas/canvas.component';

const CanvasContainer = styled.div`
    display: inline-block;
    padding: 0.5rem;
`;

export default class MyImage extends Component {
    constructor(props) {
        super()

        this.state = {
            canvas: props.image
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.myimageop === 'load') {
            this.props.onCanvasChange(this.state.canvas);
        }
        if (this.props.myimageop === 'save') {
            // todo - if we save a lot at once (click a bunch of them in rapid succession), it saves them incorrectly
            // recommendation - have a saving function that waits for this code to complete
            const newimages = [...this.props.myimages];
            newimages[this.props.num] = this.props.maincanvas;
            this.setState(state => ({
                canvas: this.props.maincanvas
            }));

            localStorage.setItem('myimages', JSON.stringify(newimages));
            this.props.onImageSave(this.props.num, this.props.maincanvas);
        }
        
    }

    render() {
        return(
            <CanvasContainer onClick={this.handleClick}>
                <Canvas 
                    canvas={this.state.canvas}
                    boardX={this.props.boardX}
                    boardY={this.props.boardY}
                    canvasWidth={100}
                    canvasHeight={100}
                     />
            </CanvasContainer>
        )
    }
}