import React, { Component } from 'react';
import styled from 'styled-components';

const SelectablePolyominoBlock = styled.td`
    width: ${props => (props.squareWidth)}px;
    height: ${props => (props.squareHeight)}px;
    background: ${props => (props.isAssigned ? props.currentColor : "white")};
    text-align: center;
    border: ${props => (props.isAssigned ? "2px solid black" : "0")};
`;

const PolyominoGrid = styled.table`
    width: 100px;
    height: 100px;
`;

export default class SelectablePolyomino extends Component {
    isSquareInCurrentPolyo(row, col) {
        if (row === 0 && col === 0) {
            return true;
        }

        return Array.isArray(
            this.props.polyomino.find(
                (item) => (item[0] === row && item[1] === col)
            )
        );
    }

    renderSquare(row, col) {
        row = row-2;
        col = col-2;
        const key = row + "," + col;
        return (
            <SelectablePolyominoBlock 
                key={key}
                row={row}
                col={col}
                squareWidth={20}
                squareHeight={20}
                currentColor={this.props.currentPrimaryColor}
                isAssigned={this.isSquareInCurrentPolyo(row, col)}
            />
        );
    }

    renderRow(row) {
        const key = 'row' + row;
        return (
            <tr key={key}>
            {
                [...Array(5)].map((_, column) => this.renderSquare(row, column))
            }
            </tr>
        );
    }

    render() {
        return (
            <PolyominoGrid 
                onClick={() => this.props.setCurrentPolyomino(this.props.polyomino)}>
                <tbody>
                {
                    [...Array(5)].map((_, row) => this.renderRow(row))
                }
                </tbody>
            </PolyominoGrid>
        )
    }
}
