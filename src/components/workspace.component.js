import React, { Component } from 'react';
import styled from 'styled-components';

import Board from "./board/board.component";
import BrushControls from "./brush-controls/brush-controls.component";
import ImagePreview from "./image-preview/image-preview.component";
import { polyominos } from '../data/polyominos';

const WorkspaceDiv = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 56px;
    left: 0;
    right: 0;
    bottom: 0;
`;

export default class Workspace extends Component {
    constructor(props) {
        super();

        const defaultPolyo = polyominos[Math.floor(Math.random() * polyominos.length)];

        this.state = {
            currentPolyo: defaultPolyo.data,
            currentUserPolyoId: -1,
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
            polyoList: polyominos,
            selectablePolyos: this.shufflePolyominos().slice(0, 3)
        }

        this.changePrimaryColor = this.changePrimaryColor.bind(this);
        this.changePolyo = this.changePolyo.bind(this);
        this.changePolyoByName = this.changePolyoByName.bind(this);
        this.changeCanvas = this.changeCanvas.bind(this);
        this.changeBoardSize = this.changeBoardSize.bind(this);
        this.changePolyoHistory = this.changePolyoHistory.bind(this);
        this.changeSquaresHistory = this.changeSquaresHistory.bind(this);
        this.changeUserPolyo = this.changeUserPolyo.bind(this);
        this.toggleEraser = this.toggleEraser.bind(this);
        this.toggleColorSelector = this.toggleColorSelector.bind(this);
    }

    changePrimaryColor(color) {
        this.setState(state => ({
            primaryColor: color
        }));
    }

    changePolyo(polyo, selected = false) {
        const history = this.state.currentPolyoHistory.slice(0, this.state.currentPolyoStep + 1);
        const polyos = Object.assign(this.state.selectablePolyos);

        if (!selected && this.state.currentUserPolyoId > -1) {
            polyos[this.state.currentUserPolyoId].data = polyo;
        }

        this.setState(state => ({
            currentPolyo: polyo,
            currentPolyoHistory: history.concat([polyo]),
            currentPolyoStep: this.state.currentPolyoStep + 1,
            selectablePolyos: polyos
        }));
    }

    changePolyoByName(name) {
        this.changePolyo(this.state.polyoList.filter(function(polyomino) {
            return polyomino.name === name;
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

    changeUserPolyo(id) {
        this.setState(state => ({
            currentUserPolyoId: id
        }));
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

    shufflePolyominos() {
        let shuffledPolyominos = polyominos;
        let currentIndex = shuffledPolyominos.length, tempValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            tempValue = shuffledPolyominos[currentIndex];
            shuffledPolyominos[currentIndex] = shuffledPolyominos[randomIndex];
            shuffledPolyominos[randomIndex] = tempValue;
        }

        return shuffledPolyominos;
    }

    render() {
        return (
            <WorkspaceDiv>
                <BrushControls 
                    currentPrimaryColor={this.state.primaryColor}
                    currentPolyo={this.state.currentPolyo}
                    currentUserPolyoId={this.state.currentUserPolyoId}
                    canvas={this.state.canvas}
                    isEraserOn={this.state.isEraserOn}
                    isColorSelectorOn={this.state.isColorSelectorOn}
                    polyoList={this.state.polyoList}
                    selectablePolyos={this.state.selectablePolyos}
                    onPrimaryColorChange={this.changePrimaryColor}
                    onPlayerChange={this.changePlayer} 
                    onCanvasChange={this.changeCanvas}
                    onPolyoChange={this.changePolyo}
                    onPolyoChangeByName={this.changePolyoByName}
                    onToggleEraser={this.toggleEraser}
                    onToggleColorSelector={this.toggleColorSelector}
                    onUndoPolyo={this.changePolyoHistory}
                    onUserPolyoChange={this.changeUserPolyo}
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