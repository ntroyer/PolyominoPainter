import React, { Component } from 'react';
import styled from 'styled-components';
import { MdRotateLeft, MdRotateRight, MdFlip, MdZoomOutMap, MdFullscreenExit, MdRedo, MdUndo } from 'react-icons/md';
import ReactTooltip from "react-tooltip";
import PolyominoPreview from './polyomino-preview/polyomino-preview.component';
import PolyominoSelector from './polyomino-selector/polyomino-selector';
import PrimaryPicker from './colorpicker/primary-colorpicker.component';
import RandomPolyomino from './random-polyomino/random-polyomino.component';
import ToggleEraser from './eraser/toggle-eraser.component';
import Button from 'react-bootstrap/Button';

const RotateLeft = styled(MdRotateLeft)`
    cursor: pointer;
`;

const RotateRight = styled(MdRotateRight)`
    cursor: pointer;
`;

const FlipX = styled(MdFlip)`
    transform: rotate(90deg);
    cursor: pointer;
`;

const FlipY = styled(MdFlip)`
    cursor: pointer;
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

const PolyominoSelectorContainer = styled.div`
    display: flex;
    margin: 10px auto;
`;

const PolyominoCanvasControls = styled.div`
    margin: 10px auto;
`;

const PolyominoMovementControls = styled.div`
    display: flex;
    align-items: center;
    margin: 10px auto;
`;

const Controls = styled.div`
    margin: 10px;
    width: 300px;
`;

export default class PlayerTest extends Component {
    constructor(props) {
        super();

        this.state = {
            matIconSize: 48
        }

        this.rotateLeft = this.rotateLeft.bind(this);
        this.rotateRight = this.rotateRight.bind(this);
        this.flipX = this.flipX.bind(this);
        this.flipY = this.flipY.bind(this);
        this.increaseGrid = this.increaseGrid.bind(this);
        this.decreaseGrid = this.decreaseGrid.bind(this);
        this.undoPolyo = this.undoPolyo.bind(this);
        this.redoPolyo = this.redoPolyo.bind(this);
        this.clearCanvas = this.clearCanvas.bind(this);
        this.clearPolyomino = this.clearPolyomino.bind(this);
    }

    rotateLeft() {
        let newPolyo = this.props.currentPolyo.map((position) => {
            let newPosition = [];

            newPosition[0] = position[1] * -1;
            newPosition[1] = position[0];

            return newPosition;
        });
        this.props.onPolyoChange(newPolyo);
    }

    rotateRight() {
        let newPolyo = this.props.currentPolyo.map((position) => {
            let newPosition = [];

            newPosition[0] = position[1];
            newPosition[1] = position[0] * -1;

            return newPosition;
        });
        this.props.onPolyoChange(newPolyo);
    }

    flipX() {
        let newPolyo = this.props.currentPolyo.map((position) => {
            let newPosition = [];

            newPosition[0] = position[0] * -1;
            newPosition[1] = position[1];

            return newPosition;
        });
        this.props.onPolyoChange(newPolyo);
    }

    flipY() {
        let newPolyo = this.props.currentPolyo.map((position) => {
            let newPosition = [];

            newPosition[0] = position[0];
            newPosition[1] = position[1] * -1;

            return newPosition;
        });
        this.props.onPolyoChange(newPolyo);
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

    clearCanvas() {
        this.props.onPlayerSquaresChange([]);
    }

    clearPolyomino() {
        this.props.onPolyoChange([]);
    }

    undoPolyo() {
        this.props.onUndoPolyo(true);
    }

    redoPolyo() {
        this.props.onRedoPolyo(false);
    }

    undoCanvas() {

    }

    redoCanvas() {

    }

    render() {
        return (
            <Controls>
                <PrimaryPicker 
                    onColorChange={this.props.onPrimaryColorChange} />
                <PolyominoPreview 
                    currentPrimaryColor={this.props.currentPrimaryColor}
                    currentPolyo={this.props.currentPolyo}
                    onPolyoChange={this.props.onPolyoChange}
                    boardX={5} 
                    boardY={5} />
                <PolyominoSelectorContainer>
                    <PolyominoSelector 
                        currentPrimaryColor={this.props.currentPrimaryColor}
                        onPolyoChange={this.props.onPolyoChange} />
                </PolyominoSelectorContainer>
                <PolyominoCanvasControls>
                    <ToggleEraser onToggleEraser={this.props.onToggleEraser} />
                    <RandomPolyomino onPolyoChange={this.props.onPolyoChange} />
                    <Button className="mt-2 mr-2" variant="secondary" onClick={this.clearCanvas}>Clear Canvas</Button>
                    <Button className="mt-2" variant="secondary" onClick={this.clearPolyomino}>Clear Polyomino</Button>
                    <IncreaseGrid data-tip="Increase Grid Size (max 20)" onClick={this.increaseGrid} size={this.state.matIconSize} />
                    <DecreaseGrid data-tip="Decrease Grid Size (min 10)" onClick={this.decreaseGrid} size={this.state.matIconSize} />
                    <Undo data-tip="Undo Canvas Change" onClick={this.undoCanvas} size={this.state.matIconSize} />
                    <Redo data-tip="Redo Canvas Change" onClick={this.redoCanvas} size={this.state.matIconSize} />
                </PolyominoCanvasControls>
                <PolyominoMovementControls>
                    <RotateLeft data-tip="Rotate Counterclockwise" onClick={this.rotateLeft} size={this.state.matIconSize} />
                    <RotateRight data-tip="Rotate Clockwise" onClick={this.rotateRight} size={this.state.matIconSize} />
                    <FlipX data-tip="Flip Horizontally" onClick={this.flipX} size={this.state.matIconSize} />
                    <FlipY data-tip="Flip Vertically" onClick={this.flipY} size={this.state.matIconSize} />
                    <Undo data-tip="Undo Polyomino Change" onClick={this.undoPolyo} size={this.state.matIconSize} />
                    <Redo data-tip="Redo Polyomino Change" onClick={this.redoPolyo} size={this.state.matIconSize} />
                </PolyominoMovementControls>
                <ReactTooltip />
            </Controls>
        )
    }
}