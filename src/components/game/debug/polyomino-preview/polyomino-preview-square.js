import React, { Component } from 'react';
import styled from 'styled-components';

const PreviewSquare = styled.td`
    width: ${props => (props.squareWidth)}px;
    height: ${props => (props.squareHeight)}px;
    background: ${props => (props.isAssigned ? props.currentColor : "white")};
    text-align: center;
    border: 2px solid black;

    &.is-center {
        outline-color: red;
        outline-style: dashed;
        outline-width: 5px;
    }
`;


export default class PolyominoPreviewSquare extends Component {
    render() {
        return (
            <PreviewSquare 
                squareWidth={process.env.REACT_APP_PREVIEW_SQUARE_WIDTH}
                squareHeight={process.env.REACT_APP_PREVIEW_SQUARE_HEIGHT}
                className={this.props.isCenter ? "is-center" : ""}
                currentColor={this.props.currentPrimaryColor}
                isAssigned={this.props.isAssigned} 
                onClick={() => this.props.onPolyominoUpdate()} />
        )
    }
}