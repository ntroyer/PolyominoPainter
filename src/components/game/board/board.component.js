import React, { Component } from 'react';
import styled from 'styled-components';
import { MdZoomOutMap, MdFullscreenExit, MdRedo, MdUndo } from 'react-icons/md';
import Square from './square.component';
import Button from 'react-bootstrap/Button';

const Grid = styled.table`
    border-collapse: collapse;
    margin: auto;
`;

const CanvasControls = styled.div`
    text-align: center;
`;

const IncreaseGrid = styled(MdZoomOutMap)`
    cursor: pointer;
`;

const DecreaseGrid = styled(MdFullscreenExit)`
    cursor: pointer;
`;

const Redo = styled(MdRedo)`
    cursor: pointer;
`;

const Undo = styled(MdUndo)`
    cursor: pointer;
`;

export default class Board extends Component {
    // as a general rule of thumb, if you are inclined to add a variable to a square, add it to the board instead

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
        console.log('undo canvas');
        this.props.onUndoCanvas(true);
    }

    redoCanvas() {
        console.log('redo canvas');
        this.props.onRedoCanvas(false);
    }

    clearCanvas() {
        this.props.onPlayerSquaresChange([]);
    }

    setCurrentCenter(row, col) {
        this.setState(state => ({
            currentComputedPolyo: this.computePolyoCoords(row, col)
        }));

        if (this.state.isMouseDown) {
            this.assignColorToSquares(this.props.currentPrimaryColor)
        }
    }

    eraseSquares() {
        let currentPlayerSquares = this.props.playerSquares;

        this.state.currentComputedPolyo.map((item) => {
            let squareKey = item[0] + ',' + item[1];
            delete currentPlayerSquares[squareKey];
            return true;
        });

        this.props.onPlayerSquaresChange(currentPlayerSquares);
    }

    assignColorToSquares(color) {
        if (this.props.isEraserOn) {
            this.eraseSquares();
            return;
        }

        // todo - refactor the below to make it look a little nicer...
        let currentPlayerSquares = Object.assign([], this.props.playerSquares);

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

    mouseIsDown() {
        this.setState(state => ({
            isMouseDown: true
        }));
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
                currentColor={this.props.currentPrimaryColor}
                assignedColor={this.getSquareAssignment(row, col)}
                isBeingChecked={this.isSquareBeingChecked(row, col)}
                onSetCurrentCenter={() => this.setCurrentCenter(row, col)}
                assignColorToSquares={() => this.assignColorToSquares(this.props.currentPrimaryColor)}
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
        return process.env.REACT_APP_BOARD_SQUARE_WIDTH * this.props.boardX;
    }

    render() {
        return (
            <div>
                <CanvasControls>
                    <div style={{userSelect: 'none'}}>
                        Canvas Controls
                    </div>
                    <IncreaseGrid data-tip="Increase Grid Size (max 20)" onClick={this.increaseGrid} size={this.props.matIconSize} />
                    <DecreaseGrid data-tip="Decrease Grid Size (min 10)" onClick={this.decreaseGrid} size={this.props.matIconSize} />
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
            </div>
        )
    }
}