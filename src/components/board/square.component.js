import React, { Component } from 'react';
import styled from 'styled-components';

const BoardSquare = styled.td`
    background: ${props => (props.assignedColor)};
    width: ${props => (props.squareWidth)}px;
    height: ${props => (props.squareHeight)}px;
    text-align: center;
    border: 2px solid black;
    cursor: pointer;
    user-select: none;

    &.is-being-checked {
        outline-color: ${props => (props.currentColor)};
        outline-style: dashed;
        outline-width: 5px;
    }
`;

export default class Square extends Component {

    constructor(props) {
        super();

        this.getCursor = this.getCursor.bind(this);
    }

    getCursor() {
        // todo - need a proper way to get an eyedropper icon for color selector and eraser icon for eraser
        return "pointer";
    }

    render() {
        return(
            <BoardSquare
                squareWidth={process.env.REACT_APP_BOARD_SQUARE_WIDTH}
                squareHeight={process.env.REACT_APP_BOARD_SQUARE_HEIGHT}
                currentColor={this.props.currentColor}
                assignedColor={this.props.assignedColor}
                cursor={this.getCursor()}
                className={this.props.isBeingChecked ? "is-being-checked" : ""}
                onMouseEnter={() => this.props.onSetCurrentCenter(this.props.row, this.props.col)}
                onMouseUp={() => this.props.mouseIsUp()}
                onMouseDown={() => this.props.mouseIsDown(this.props.row, this.props.col)}
                >
            </BoardSquare>
        )
    }
}
