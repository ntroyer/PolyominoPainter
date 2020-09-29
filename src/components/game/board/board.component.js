import React, { Component } from 'react';
import styled from 'styled-components';
import Square from './square.component';

const Grid = styled.table`
    border-collapse: collapse;
    margin: auto;
`;

export default class Board extends Component {
    // as a general rule of thumb, if you are inclined to add a variable to a square, add it to the board instead

    constructor(props) {
        super();

        this.state = {
            currentComputedPolyo: [-1, -1],
            playerSquares: []
        }

        this.setCurrentCenter = this.setCurrentCenter.bind(this);
    }

    setCurrentCenter(row, col) {
        this.setState(state => ({
            currentComputedPolyo: this.computePolyoCoords(row, col)
        }));
    }

    assignColorToSquares(color) {
        let currentPlayerSquares = this.props.playerSquares;

        this.state.currentComputedPolyo.map((item) => {
            currentPlayerSquares[item[0] + ',' + item[1]] = color;
            return true;
        });

        this.props.onPlayerSquaresChange(currentPlayerSquares);
    }

    computePolyoCoords(row, col) {
        return [[row, col]].concat(this.props.currentPolyo.map((value) => {
            return [(row + value[0]), (col + value[1])]
        }));
    }

    getSquareAssignment(row, col) {
        const rowColKey = row + ',' + col;
        if (this.props.playerSquares[rowColKey] && this.props.playerSquares[rowColKey] !== 'undefined') {
            return this.props.playerSquares[rowColKey];
        }

        return 0;
    }

    isSquareBeingChecked(row, col) {
        const stringifiedCoords = JSON.stringify([row, col]);
        return (this.state.currentComputedPolyo.some(item => (JSON.stringify(item) === stringifiedCoords)));
    }

    renderSquare(row, col) {
        const key = 'square' + row + col;
        return (
            <Square 
                key={key}
                row={row}
                col={col}
                currentColor={this.props.currentPrimaryColor}
                assignedColor={this.getSquareAssignment(row, col)}
                isBeingChecked={this.isSquareBeingChecked(row, col)}
                onSetCurrentCenter={() => this.setCurrentCenter(row, col)}
                assignColorToSquares={() => this.assignColorToSquares(this.props.currentPrimaryColor)}
            />
        );
    }

    renderRow(row) {
        const key = 'row' + row;
        return (
            <tr key={key}>
            {
                [...Array(this.props.boardX)].map((_, column) => this.renderSquare(row, column))
            }
            </tr>
        );
    }

    resetCurrentPolyo() {
        this.setState(state => ({
            currentComputedPolyo: [-1, -1]
        }))
    }

    getGridWidth() {
        return process.env.REACT_APP_BOARD_SQUARE_WIDTH * this.props.boardX;
    }

    render() {
        return (
            <Grid>
                <tbody onMouseLeave={() => this.resetCurrentPolyo()} style={{width: this.getGridWidth(), display: "block"}}>
                    {
                        [...Array(this.props.boardY)].map((_, row) => this.renderRow(row))
                    }
                </tbody>
            </Grid>
        )
    }
}