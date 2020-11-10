import React, { Component } from 'react';
import styled from 'styled-components';

import PolyominoPreviewSquare from './polyomino-preview-square';

const BoardGrid = styled.table`
    border-collapse: collapse;
    margin: auto;
    background-image:
      linear-gradient(45deg, #f0f5f5 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #f0f5f5 75%),
      linear-gradient(45deg, transparent 75%, #f0f5f5 75%),
      linear-gradient(45deg, #f0f5f5 25%, #ffffff 25%);
    
    background-size: 60px 60px;

    background-position: 0 0, 0 0, -30px -30px, 30px 30px;
`;

export default class PolyominoPreview extends Component {
    isSquareInCurrentPolyo(row, col) {
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
        let foundNum = -1;

        let polyo = this.props.currentPolyo.map((element, key) => {
            if (element[0] === row && element[1] === col) {
                foundNum = key;
            }
            return element;
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
        const key = 'preview_' + row + "," + col;
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
