import React, { Component } from 'react';
import styled from 'styled-components';
import { MdRotateLeft, MdRotateRight, MdFlip, MdRedo, MdUndo, MdColorize } from 'react-icons/md';
import { FaEraser } from 'react-icons/fa';
import ReactTooltip from "react-tooltip";
import PolyominoPreview from './polyomino-preview/polyomino-preview.component';
import PolyominoSelector from './polyomino-selector/polyomino-selector';
import PrimaryPicker from './colorpicker/primary-colorpicker.component';
import RandomPolyomino from './random-polyomino/random-polyomino.component';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const RotateLeft = styled(MdRotateLeft)`
    cursor: pointer;
`;

const RotateRight = styled(MdRotateRight)`
    cursor: pointer;
`;

const ColorSelect = styled(MdColorize)`
    cursor: pointer;
    color: ${props => (props.color)};
`

const Eraser = styled(FaEraser)`
    cursor: pointer;
    color: ${props => (props.color)};
`

const FlipX = styled(MdFlip)`
    transform: rotate(90deg);
    cursor: pointer;
`;

const FlipY = styled(MdFlip)`
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
    display: flex;
`;

const PolyominoMovementControls = styled.div`
    display: flex;
    align-items: center;
    margin: 10px auto;
`;

const Controls = styled.div`
    padding: 10px;
    width: 24rem;
    background-color: #e9ecef;
`;

export default class BrushControls extends Component {
    constructor(props) {
        super();

        this.rotateLeft = this.rotateLeft.bind(this);
        this.rotateRight = this.rotateRight.bind(this);
        this.flipX = this.flipX.bind(this);
        this.flipY = this.flipY.bind(this);
        this.undoPolyo = this.undoPolyo.bind(this);
        this.redoPolyo = this.redoPolyo.bind(this);
        this.clearPolyomino = this.clearPolyomino.bind(this);
        this.getColorSelectColor = this.getColorSelectColor.bind(this);
        this.getEraserColor = this.getEraserColor.bind(this);
    }

    rotateLeft() {
        this.props.onPolyoChange(this.props.currentPolyo.map((position) => {
            return [position[1] * -1, position[0]];
        }));
    }

    rotateRight() {
        this.props.onPolyoChange(this.props.currentPolyo.map((position) => {
            return [position[1], position[0] * -1];
        }));
    }

    flipX() {
        this.props.onPolyoChange(this.props.currentPolyo.map((position) => {
            return [position[0] * -1, position[1]];
        }));
    }

    flipY() {
        this.props.onPolyoChange(this.props.currentPolyo.map((position) => {
            return [position[0], position[1] * -1];
        }));
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

    setPolyoByName(name) {
        this.props.onPolyoChangeByName(name);
    }

    getColorSelectColor() {
        if (this.props.isColorSelectorOn) {
            return "gray";
        }
        return "black";
    }

    getEraserColor() {
        if (this.props.isEraserOn) {
            return "gray";
        }
        return "black";
    }

    render() {
        return (
            <Controls>
                <p>
                    Brush Controls
                </p>
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
                        selectablePolyos={this.props.selectablePolyos}
                        currentPrimaryColor={this.props.currentPrimaryColor}
                        onPolyoChange={this.props.onPolyoChange} 
                        onUserPolyoChange={this.props.onUserPolyoChange}/>
                </PolyominoSelectorContainer>
                <PolyominoCanvasControls>
                    <RandomPolyomino onPolyoChange={this.props.onPolyoChange} polyominos={this.props.polyoList}/>
                    <Button variant="secondary" onClick={this.clearPolyomino}>Clear Brush</Button>
                    <DropdownButton id="select-brush" title="Select Brush" onSelect={(name) => this.setPolyoByName(name)}>
                        {this.props.polyoList.map(
                            (brush) => (
                                <Dropdown.Item eventKey={brush.name}>{brush.name}</Dropdown.Item>
                            )
                        )}
                    </DropdownButton>
                </PolyominoCanvasControls>
                <PolyominoMovementControls>
                    <RotateLeft data-tip="Rotate Counterclockwise" onClick={this.rotateLeft} size={this.props.matIconSize} />
                    <RotateRight data-tip="Rotate Clockwise" onClick={this.rotateRight} size={this.props.matIconSize} />
                    <FlipX data-tip="Flip Horizontally" onClick={this.flipX} size={this.props.matIconSize} />
                    <FlipY data-tip="Flip Vertically" onClick={this.flipY} size={this.props.matIconSize} />
                    <Undo data-tip="Undo Brush Change" onClick={this.undoPolyo} size={this.props.matIconSize} />
                    <Redo data-tip="Redo Brush Change" onClick={this.redoPolyo} size={this.props.matIconSize} />
                </PolyominoMovementControls>
                <PolyominoMovementControls>
                    <ColorSelect data-tip="Toggle Color Selector" onClick={this.props.onToggleColorSelector} size={this.props.matIconSize} color={this.getColorSelectColor} />
                    <Eraser data-tip="Toggle Eraser" onClick={this.props.onToggleEraser} size={this.props.matIconSize} color={this.getEraserColor} />
                </PolyominoMovementControls>
                <ReactTooltip />
            </Controls>
        )
    }
}