import React, { Component } from 'react';
import styled from 'styled-components';

import Board from "./board/board.component";
import BrushControls from "./brush-controls/brush-controls.component";
import ImagePreview from "./image-preview/image-preview.component";
import { polyominos } from '../data/polyominos';

const WorkspaceDiv = styled.div`
    display: flex;
    justify-content: center;
    height: 95.8vh;
`;

export default class Workspace extends Component {
    constructor(props) {
        super();

        const defaultPolyo = polyominos[Math.floor(Math.random() * polyominos.length)];

        this.state = {
            currentPolyo: defaultPolyo.data,
            primaryColor: "blue",
            canvas: [],
            xSquares: Number(process.env.REACT_APP_BOARD_NUM_SQUARES_X),
            ySquares: Number(process.env.REACT_APP_BOARD_NUM_SQUARES_Y),
            isEraserOn: false,
            isColorSelectorOn: false,
            canvasHistory: [[]],
            currentPolyoHistory: [defaultPolyo.data],
            canvasStep: 0,
            currentPolyoStep: 0,
            matIconSize: 50,
            polyoList: polyominos
        }

        this.changePrimaryColor = this.changePrimaryColor.bind(this);
        this.changePolyo = this.changePolyo.bind(this);
        this.changePolyoByName = this.changePolyoByName.bind(this);
        this.changeCanvas = this.changeCanvas.bind(this);
        this.changeBoardSize = this.changeBoardSize.bind(this);
        this.changePolyoHistory = this.changePolyoHistory.bind(this);
        this.changeSquaresHistory = this.changeSquaresHistory.bind(this);
        this.toggleEraser = this.toggleEraser.bind(this);
        this.toggleColorSelector = this.toggleColorSelector.bind(this);
    }

    changePrimaryColor(color) {
        this.setState(state => ({
            primaryColor: color
        }));
    }

    changePolyo(polyo) {
        const history = this.state.currentPolyoHistory.slice(0, this.state.currentPolyoStep + 1);
        this.setState(state => ({
            currentPolyo: polyo,
            currentPolyoHistory: history.concat([polyo]),
            currentPolyoStep: this.state.currentPolyoStep + 1
        }));
    }

    changePolyoByName(name) {
        this.changePolyo(this.state.polyoList.filter(function(polyomino) {
            return polyomino.name == name;
        })[0].data);
    }

    changeCanvas(squares) {
        const history = this.state.canvasHistory.slice(0, this.state.canvasStep + 1);
        this.setState(state => ({
            canvas: squares,
            canvasHistory: history.concat([squares]),
            canvasStep: this.state.canvasStep + 1
        }));
    }

    changeBoardSize(x, y) {
        this.setState(state => ({
            xSquares: x,
            ySquares: y
        }));
    }

    changePolyoHistory(isUndo) {
        const newStep = isUndo ? this.state.currentPolyoStep - 1 : this.state.currentPolyoStep + 1;
        if (typeof this.state.currentPolyoHistory[newStep] !== 'undefined') {
            this.setState(state => ({
                currentPolyo: this.state.currentPolyoHistory[newStep],
                currentPolyoStep: newStep
            }));
        }
    }

    changeSquaresHistory(isUndo) {
        const newStep = isUndo ? this.state.canvasStep - 1 : this.state.canvasStep + 1;
        if (typeof this.state.canvasHistory[newStep] !== 'undefined') {
            this.setState(state => ({
                canvas: this.state.canvasHistory[newStep],
                canvasStep: newStep
            }));
        }
    }

    toggleEraser() {
        this.setState(state => ({
            isEraserOn: !this.state.isEraserOn
        }));

        if (this.state.isColorSelectorOn) {
            this.toggleColorSelector();
        }
    }

    toggleColorSelector() {
        this.setState(state => ({
            isColorSelectorOn: !this.state.isColorSelectorOn
        }));

        if (this.state.isEraserOn) {
            this.toggleEraser();
        }
    }

    render() {
        return (
            <WorkspaceDiv>
                <BrushControls 
                    currentPrimaryColor={this.state.primaryColor}
                    currentPolyo={this.state.currentPolyo}
                    canvas={this.state.canvas}
                    isEraserOn={this.state.isEraserOn}
                    isColorSelectorOn={this.state.isColorSelectorOn}
                    polyoList={this.state.polyoList}
                    onPrimaryColorChange={this.changePrimaryColor}
                    onPlayerChange={this.changePlayer} 
                    onCanvasChange={this.changeCanvas}
                    onPolyoChange={this.changePolyo}
                    onPolyoChangeByName={this.changePolyoByName}
                    onToggleEraser={this.toggleEraser}
                    onToggleColorSelector={this.toggleColorSelector}
                    onUndoPolyo={this.changePolyoHistory}
                    onRedoPolyo={this.changePolyoHistory}
                    matIconSize={this.state.matIconSize}
                />
                <Board 
                    currentPrimaryColor={this.state.primaryColor}
                    currentPolyo={this.state.currentPolyo}
                    canvas={this.state.canvas}
                    isEraserOn={this.state.isEraserOn}
                    isColorSelectorOn={this.state.isColorSelectorOn}
                    onPrimaryColorChange={this.changePrimaryColor}
                    onCanvasChange={this.changeCanvas}
                    onToggleColorSelector={this.toggleColorSelector}
                    matIconSize={this.state.matIconSize}
                    onBoardSizeChange={this.changeBoardSize}
                    onUndoCanvas={this.changeSquaresHistory}
                    onRedoCanvas={this.changeSquaresHistory}
                    boardX={this.state.xSquares}
                    boardY={this.state.ySquares}
                />
                <ImagePreview 
                    canvas={this.state.canvas}
                    boardX={this.state.xSquares}
                    boardY={this.state.ySquares} />
            </WorkspaceDiv>
        )
    }
}