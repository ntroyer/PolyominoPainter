import React, { Component } from 'react';
import styled from 'styled-components';

import PolyominoPreviewSquare from './polyomino-preview-square';

const BoardGrid = styled.table`
    border-collapse: collapse;
`;

export default class PolyominoPreview extends Component {
    isSquareInCurrentPolyo(row, col) {
        if (this.isSquareCenter(row, col)) {
            return true;
        }

        return Array.isArray(
            this.props.currentPolyo.find(
                (item) => (item[0] === row && item[1] === col)
            )
        );
    }

    isSquareCenter(row, col) {
        return (row === 0 && col === 0);
    }

    toggleSquareInCurrentPolyo(row, col) {
        let polyo = this.props.currentPolyo;
        let foundNum = -1;

        this.props.currentPolyo.map((element, key) => {
            if (element[0] == row && element[1] == col) {
                foundNum = key;
            }
        });
        if (foundNum <= -1) {
            polyo.push([row, col]);
        } else {
            polyo.splice(foundNum, 1);
        }
        this.props.onPolyoChange(polyo);
    }

    renderSquare(row, col) {
        row = row-2;
        col = col-2;
        const key = row + "," + col;
        return (
            <PolyominoPreviewSquare
                key={key}
                row={row}
                col={col}
                currentPrimaryColor={this.props.currentPrimaryColor}
                isAssigned={this.isSquareInCurrentPolyo(row, col)}
                isCenter={this.isSquareCenter(row, col)}
                onPolyominoUpdate={() => this.toggleSquareInCurrentPolyo(row, col)}
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

    render() {
        return (
            <BoardGrid>
                <tbody>
                {
                    [...Array(this.props.boardY)].map((_, row) => this.renderRow(row))
                }
                </tbody>
            </BoardGrid>
        )
    }
}
