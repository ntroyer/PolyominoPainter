import React, { Component } from 'react';
import styled from 'styled-components';
import { MdRedo, MdUndo } from 'react-icons/md';
import Square from './square.component';
import Button from 'react-bootstrap/Button';

const Grid = styled.table`
    border-collapse: collapse;
    margin: auto;

    background-image:
      linear-gradient(45deg, #f0f5f5 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #f0f5f5 75%),
      linear-gradient(45deg, transparent 75%, #f0f5f5 75%),
      linear-gradient(45deg, #f0f5f5 25%, #ffffff 25%);
    
    background-size: 80px 80px;

    background-position: 0 0, 0 0, -40px -40px, 40px 40px;
`;

const CanvasControls = styled.div`
    text-align: center;
`;

const Redo = styled(MdRedo)`
    cursor: pointer;
`;

const Undo = styled(MdUndo)`
    cursor: pointer;
`;

const BoardWrapper = styled.div``;

export default class Board extends Component {
    constructor(props) {
        super();

        // todo - isMouseDown should probably be moved to the main component
        this.state = {
            currentComputedPolyo: [-1, -1],
            isMouseDown: false
        }

        this.setCurrentCenter = this.setCurrentCenter.bind(this);
        this.mouseIsDown = this.mouseIsDown.bind(this);
        this.mouseIsUp = this.mouseIsUp.bind(this);
        this.increaseGrid = this.increaseGrid.bind(this);
        this.decreaseGrid = this.decreaseGrid.bind(this);
        this.undoCanvas = this.undoCanvas.bind(this);
        this.redoCanvas = this.redoCanvas.bind(this);
        this.clearCanvas = this.clearCanvas.bind(this);
    }

    increaseGrid() {
        if (this.props.boardX+1 <= 20) {
            this.props.onBoardSizeChange(this.props.boardX+1, this.props.boardY+1)
        }
    }

    decreaseGrid() {
        if (this.props.boardX-1 >= 10) {
            this.props.onBoardSizeChange(this.props.boardX-1, this.props.boardY-1)
        }
    }

    undoCanvas() {
        this.props.onUndoCanvas(true);
    }

    redoCanvas() {
        this.props.onRedoCanvas(false);
    }

    clearCanvas() {
        this.props.onCanvasChange([]);
    }

    setCurrentCenter(row, col) {
        const newPolyo = this.computePolyoCoords(row, col);
        this.setState(state => ({
            currentComputedPolyo: newPolyo
        }));

        if (this.state.isMouseDown) {
            this.assignColorToSquares(this.props.currentPrimaryColor, newPolyo);
        }
    }

    eraseSquares(polyo) {
        let canvas = Object.assign({}, this.props.canvas);

        polyo.map((item) => {
            let squareKey = item[0] + ',' + item[1];
            delete canvas[squareKey];
            return true;
        });

        this.props.onCanvasChange(canvas);
    }

    getColorFromSquare(assignedColor) {
        if (assignedColor === 0) {
            // todo - maybe display an alert telling the user to select a color
            return;
        }
        this.props.onPrimaryColorChange(assignedColor);
        this.props.onToggleColorSelector();
    }

    assignColorToSquares(newColor, polyo, assignedColor) {
        if (this.props.isColorSelectorOn) {
            this.getColorFromSquare(assignedColor);
            return;
        }
        if (this.props.isEraserOn) {
            this.eraseSquares(polyo);
            return;
        }
        if (this.props.isFillOn) {
            const newCanvas = this.fillSquares(polyo[0], assignedColor, newColor, Object.assign({}, this.props.canvas));
            this.props.onCanvasChange(newCanvas);
            return;
        }

        let canvas = Object.assign({}, this.props.canvas);

        polyo.map((item) => {
            canvas[item[0] + ',' + item[1]] = newColor;
            return true;
        });

        this.props.onCanvasChange(canvas);
    }

    fillSquares(square, oldColor, newColor, canvas) {
        // this is an implementation of "flood fill" as shown here:
        // https://www.geeksforgeeks.org/flood-fill-algorithm-implement-fill-paint/
        const key = square[0] + "," + square[1];

        if (typeof canvas[key] === 'undefined') {     
            if (oldColor !== 0) {
                return canvas;
            }
            canvas[key] = 0;
        }

        if (canvas[key] !== oldColor) {
            return canvas;
        }
        canvas[key] = newColor;

        this.fillSquares([Math.min(this.props.boardX - 1, square[0] + 1), square[1]], oldColor, newColor, canvas);
        this.fillSquares([Math.max(0, square[0] - 1), square[1]], oldColor, newColor, canvas);
        this.fillSquares([square[0], Math.min(this.props.boardY - 1, square[1] + 1)], oldColor, newColor, canvas);
        this.fillSquares([square[0], Math.max(0, square[1] - 1)], oldColor, newColor, canvas);

        return canvas;
    }

    computePolyoCoords(row, col) {
        if (this.props.isColorSelectorOn || this.props.isFillOn) {
            return [[row, col]];
        }

        return this.props.currentPolyo.map((value) => {
            return [(row + value[0]), (col + value[1])]
        });
    }

    getSquareAssignment(row, col) {
        const rowColKey = row + ',' + col;
        if (this.props.canvas[rowColKey] && this.props.canvas[rowColKey] !== 'undefined') {
            return this.props.canvas[rowColKey];
        }
        return 0;
    }

    isSquareBeingChecked(row, col) {
        const stringifiedCoords = JSON.stringify([row, col]);
        return (this.state.currentComputedPolyo.some(item => (JSON.stringify(item) === stringifiedCoords)));
    }

    mouseIsDown(row, col) {
        this.setState(state => ({
            isMouseDown: true
        }));
        this.assignColorToSquares(this.props.currentPrimaryColor, this.state.currentComputedPolyo, this.getSquareAssignment(row, col));
    }

    mouseIsUp() {
        this.setState(state => ({
            isMouseDown: false
        }));
    }

    renderSquare(row, col) {
        const key = 'square' + row + col;
        return (
            <Square 
                key={key}
                row={row}
                col={col}
                width={this.props.squareWidth}
                height={this.props.squareHeight}
                currentColor={this.props.currentPrimaryColor}
                assignedColor={this.getSquareAssignment(row, col)}
                isBeingChecked={this.isSquareBeingChecked(row, col)}
                isColorSelectorOn={this.props.isColorSelectorOn}
                isEraserOn={this.props.isEraserOn}
                onSetCurrentCenter={() => this.setCurrentCenter(row, col)}
                mouseIsUp={this.mouseIsUp}
                mouseIsDown={this.mouseIsDown}
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
        return this.props.squareWidth * this.props.boardX;
    }

    render() {
        return (
            <BoardWrapper>
                <CanvasControls>
                    <div style={{userSelect: 'none'}}>
                        Canvas Controls
                    </div>
                    <Undo data-tip="Undo Canvas Change" onClick={this.undoCanvas} size={this.props.matIconSize} />
                    <Redo data-tip="Redo Canvas Change" onClick={this.redoCanvas} size={this.props.matIconSize} />
                    <Button className="ml-2" variant="secondary" onClick={this.clearCanvas}>Clear Canvas</Button>
                </CanvasControls>
                <Grid>
                    <tbody onMouseLeave={() => this.resetCurrentPolyo()} style={{width: this.getGridWidth(), display: "block"}}>
                        {
                            [...Array(this.props.boardY)].map((_, row) => this.renderRow(row))
                        }
                    </tbody>
                </Grid>
            </BoardWrapper>
        )
    }
}