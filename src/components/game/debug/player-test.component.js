import React, { Component } from 'react';
import styled from 'styled-components';
import { MdRotateLeft, MdRotateRight, MdFlip, MdZoomOutMap, MdFullscreenExit } from 'react-icons/md';
import ReactTooltip from "react-tooltip";
import PolyominoPreview from './polyomino-preview/polyomino-preview.component';
import PolyominoSelector from './polyomino-selector/polyomino-selector';
import Canvas from './canvas/canvas.component';
import PrimaryPicker from './canvas/primary-colorpicker.component';
import RandomPolyomino from './random-polyomino/random-polyomino.component';

const RotateLeft = styled(MdRotateLeft)`
    cursor: pointer;
`;

const RotateRight = styled(MdRotateRight)`
    cursor: pointer;
`;

const FlipX = styled(MdFlip)`
    rotate: 90deg;
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

const PolyominoSelectorContainer = styled.div`
    display: flex;
    padding-top: 10px;
`;

export default class PlayerTest extends Component {
    constructor(props) {
        super();

        this.rotateLeft = this.rotateLeft.bind(this);
        this.rotateRight = this.rotateRight.bind(this);
        this.flipX = this.flipX.bind(this);
        this.flipY = this.flipY.bind(this);
        this.increaseGrid = this.increaseGrid.bind(this);
        this.decreaseGrid = this.decreaseGrid.bind(this);
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

    render() {
        return (
            <div>
                <div>
                    Primary color
                </div>
                <PrimaryPicker 
                    onColorChange={this.props.onPrimaryColorChange} />
                <div>
                    Polyomino Controls
                </div>
                <PolyominoPreview 
                    currentPrimaryColor={this.props.currentPrimaryColor}
                    currentPolyo={this.props.currentPolyo}
                    boardX={5} 
                    boardY={5} />
                <PolyominoSelectorContainer>
                    <PolyominoSelector 
                        currentPrimaryColor={this.props.currentPrimaryColor}
                        onPolyoChange={this.props.onPolyoChange} />
                </PolyominoSelectorContainer>
                <div>
                    <RandomPolyomino onPolyoChange={this.props.onPolyoChange}/>
                    <RotateLeft data-tip="Rotate Counterclockwise" onClick={this.rotateLeft} />
                    <RotateRight data-tip="Rotate Clockwise" onClick={this.rotateRight} />
                    <FlipX data-tip="Flip Horizontally" onClick={this.flipX} />
                    <FlipY data-tip="Flip Vertically" onClick={this.flipY} />
                    <IncreaseGrid data-tip="Increase Grid Size (max 20)" onClick={this.increaseGrid} />
                    <DecreaseGrid data-tip="Decrease Grid Size (min 10)" onClick={this.decreaseGrid} />
                </div>
                <Canvas 
                    playerSquares={this.props.playerSquares}
                    boardX={this.props.boardX}
                    boardY={this.props.boardY} />
                <ReactTooltip />
            </div>
        )
    }
}