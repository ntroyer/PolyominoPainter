import React, { Component } from 'react';
import styled from 'styled-components';

import Canvas from './canvas/canvas.component';

export default class ImagePreview extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div style={{width: "12%"}}>
                <div>
                    Image Preview
                </div>
                
                <Canvas 
                    playerSquares={this.props.playerSquares}
                    boardX={this.props.boardX}
                    boardY={this.props.boardY} />
            </div>
        )
    }
}