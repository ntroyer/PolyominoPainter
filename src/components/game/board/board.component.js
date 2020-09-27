import React, { Component } from 'react';
import styled from 'styled-components';
import Square from './square.component';

const Grid = styled.table`
    border-collapse: collapse;
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

    assignSquaresToPlayer(player) {
        let currentPlayerSquares = this.props.playerSquares;

        this.state.currentComputedPolyo.map((item) => {
            currentPlayerSquares[item[0] + ',' + item[1]] = player;
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
                currentPlayer={this.props.currentPlayer}
                assignedPlayer={this.getSquareAssignment(row, col)}
                isBeingChecked={this.isSquareBeingChecked(row, col)}
                onSetCurrentCenter={() => this.setCurrentCenter(row, col)}
                assignSquaresToPlayer={() => this.assignSquaresToPlayer(this.props.currentPlayer)}
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

    render() {
        return (
            <Grid>
                <tbody onMouseLeave={() => this.resetCurrentPolyo()}>
                    {
                        [...Array(this.props.boardY)].map((_, row) => this.renderRow(row))
                    }
                </tbody>
            </Grid>
        )
    }
}