import React, { Component } from 'react';
import styled from 'styled-components';

import Board from "./board/board.component";
import BrushControls from "./brush-controls/brush-controls.component";
import ImagePreview from "./image-preview/image-preview.component";
import Button from 'react-bootstrap/Button';
import { polyominos } from '../data/polyominos';

const Crudbar = styled.div`
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #bfbfbf;
    padding: 10px;
`;

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
        const color = localStorage.getItem('color1') ? localStorage.getItem('color1') : "blue";
        const userPolyo = localStorage.getItem('userpolyo') ? Number(localStorage.getItem('userpolyo')) : -1;
        const userPolyoIdHistory = [userPolyo];

        const canvas = localStorage.getItem('canvas') ? JSON.parse(localStorage.getItem('canvas')) : {};
        // const canvas = {};
        const canvasHistory = [canvas];
        const canvasStep = 0;

        const polyo = localStorage.getItem('polyo') ? JSON.parse(localStorage.getItem('polyo')) : defaultPolyo.data;
        // const polyo = {};
        const polyoHistory = [polyo];
        const polyoStep = 0;
        const shuffledPolyos = this.shufflePolyominos();
        const selectablePolyos = localStorage.getItem('selectablepolyos') ? JSON.parse(localStorage.getItem('selectablepolyos')) : shuffledPolyos.slice(0, 3);

        const myimages = [[], [], [], [], [], []];

        this.state = {
            currentPolyo: polyo,
            currentUserPolyoId: userPolyo,
            userPolyoIdHistory: userPolyoIdHistory,
            primaryColor: color,
            canvas: canvas,
            xSquares: Number(process.env.REACT_APP_BOARD_NUM_SQUARES_X),
            ySquares: Number(process.env.REACT_APP_BOARD_NUM_SQUARES_Y),
            isEraserOn: false,
            isColorSelectorOn: false,
            isFillOn: false,
            canvasHistory: canvasHistory,
            currentPolyoHistory: polyoHistory,
            canvasStep: canvasStep,
            currentPolyoStep: polyoStep,
            matIconSize: 50,
            polyoList: shuffledPolyos.slice(0, 10),
            selectablePolyos: selectablePolyos,
            myimages: myimages,
            myimageop: "load"
        }

        this.changePrimaryColor = this.changePrimaryColor.bind(this);
        this.changePolyo = this.changePolyo.bind(this);
        this.changePolyoByName = this.changePolyoByName.bind(this);
        this.changeCanvas = this.changeCanvas.bind(this);
        this.changeBoardSize = this.changeBoardSize.bind(this);
        this.changePolyoHistory = this.changePolyoHistory.bind(this);
        this.changeSquaresHistory = this.changeSquaresHistory.bind(this);
        this.changeUserPolyo = this.changeUserPolyo.bind(this);
        this.changeMyImages = this.changeMyImages.bind(this);
        this.changeMyImageOp = this.changeMyImageOp.bind(this);
        this.toggleEraser = this.toggleEraser.bind(this);
        this.toggleColorSelector = this.toggleColorSelector.bind(this);
        this.toggleFill = this.toggleFill.bind(this);
        this.newImage = this.newImage.bind(this);
        this.resetCanvas = this.resetCanvas.bind(this);
    }

    changePrimaryColor(color) {
        localStorage.setItem('color1', color);
        this.setState(state => ({
            primaryColor: color
        }));
    }

    changePolyo(polyo, selected = false) {
        const history = this.state.currentPolyoHistory.slice(0, this.state.currentPolyoStep + 1);
        const polyos = Object.assign(this.state.selectablePolyos);

        if (!selected && this.state.currentUserPolyoId > -1) {
            const userIdHistory = this.state.userPolyoIdHistory.slice(0, this.state.currentPolyoStep + 1);
            polyos[this.state.currentUserPolyoId].data = polyo;

            this.setState(state => ({
                userPolyoIdHistory: userIdHistory.concat([this.state.currentUserPolyoId])
            }));
        }

        localStorage.setItem('polyo', JSON.stringify(polyo));
        // localStorage.setItem('polyohist', JSON.stringify(history.concat([polyo])));
        // localStorage.setItem('polyostep', this.state.currentPolyoStep + 1);
        localStorage.setItem('selectablepolyos', JSON.stringify(polyos));

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

        localStorage.setItem('canvas', JSON.stringify(squares));
        // localStorage.setItem('canvashist', JSON.stringify(history.concat([squares])));
        // localStorage.setItem('canvasstep', this.state.canvasStep + 1);

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

        const polyos = Object.assign(this.state.selectablePolyos);
        const stepUserId = this.state.userPolyoIdHistory[newStep];

        if (stepUserId > -1) {
            polyos[stepUserId].data = this.state.currentPolyoHistory[newStep];
        }

        if (typeof this.state.currentPolyoHistory[newStep] !== 'undefined') {
            localStorage.setItem('polyo', JSON.stringify(this.state.currentPolyoHistory[newStep]));
            localStorage.setItem('userpolyo', stepUserId);
            localStorage.setItem('selectablepolyos', JSON.stringify(polyos));
            this.setState(state => ({
                currentPolyo: this.state.currentPolyoHistory[newStep],
                currentPolyoStep: newStep,
                currentUserPolyoId: stepUserId,
                selectablePolyos: polyos,
            }));
        }
    }

    changeSquaresHistory(isUndo) {
        const newStep = isUndo ? this.state.canvasStep - 1 : this.state.canvasStep + 1;

        // localStorage.setItem('canvasstep', newStep);

        if (typeof this.state.canvasHistory[newStep] !== 'undefined') {
            localStorage.setItem('canvas', JSON.stringify(this.state.canvasHistory[newStep]));
            this.setState(state => ({
                canvas: this.state.canvasHistory[newStep],
                canvasStep: newStep
            }));
        }
    }

    changeUserPolyo(id) {
        localStorage.setItem('userpolyo', id);
        const userIdHistory = this.state.userPolyoIdHistory.slice(0, this.state.currentPolyoStep + 1);
        this.setState(state => ({
            currentUserPolyoId: id,
            userPolyoIdHistory: userIdHistory.concat([id])
        }));
    }

    toggleEraser() {
        const newval = !this.state.isEraserOn;
        this.setState(state => ({
            isEraserOn: newval
        }));

        this.turnOffOtherTools("eraser");
    }

    toggleColorSelector() {
        const newval = !this.state.isColorSelectorOn;
        this.setState(state => ({
            isColorSelectorOn: newval
        }));

        this.turnOffOtherTools("color");
    }

    toggleFill() {
        const newval = !this.state.isFillOn;
        this.setState(state => ({
            isFillOn: newval
        }));

        this.turnOffOtherTools("fill");
    }

    turnOffOtherTools(skip) {
        if (this.state.isEraserOn && skip !== 'eraser') {
            this.toggleEraser();
        }

        if (this.state.isFillOn && skip !== 'fill') {
            this.toggleFill();
        }

        if (this.state.isColorSelectorOn && skip !== 'color') {
            this.toggleColorSelector();
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

    newImage() {
        // todo - add an are you sure prompt?
        this.resetCanvas();
    }

    resetCanvas() {
        this.setState(state => ({
            canvas: {},
            canvasHistory: [{}],
            canvasStep: 0
        }));
    }

    loadImage() {
        console.log('load image coming soon...');
    }

    saveImage() {
        console.log('save image coming soon...');
    }

    changeMyImages(images) {
        this.setState(state => ({
            myimages: images
        }));
    }

    changeMyImageOp(op) {
        this.setState(state => ({
            myimageop: op
        }));
    }

    render() {
        return (
            <div>
                <Crudbar>
                    Polyomino Painter
                    <div>
                        <Button variant="secondary" onClick={this.newImage}>New Image</Button>
                    </div>
                </Crudbar>
                <WorkspaceDiv>
                    <BrushControls 
                        currentPrimaryColor={this.state.primaryColor}
                        currentPolyo={this.state.currentPolyo}
                        currentUserPolyoId={this.state.currentUserPolyoId}
                        canvas={this.state.canvas}
                        isEraserOn={this.state.isEraserOn}
                        isColorSelectorOn={this.state.isColorSelectorOn}
                        isFillOn={this.state.isFillOn}
                        polyoList={this.state.polyoList}
                        selectablePolyos={this.state.selectablePolyos}
                        onPrimaryColorChange={this.changePrimaryColor}
                        onPlayerChange={this.changePlayer}
                        onCanvasChange={this.changeCanvas}
                        onPolyoChange={this.changePolyo}
                        onPolyoChangeByName={this.changePolyoByName}
                        onToggleEraser={this.toggleEraser}
                        onToggleColorSelector={this.toggleColorSelector}
                        onToggleFill={this.toggleFill}
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
                        isFillOn={this.state.isFillOn}
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
                        boardY={this.state.ySquares}
                        images={this.state.myimages}
                        myimageop={this.state.myimageop}
                        onMyImagesChange={this.changeMyImages} 
                        onMyImageOpChange={this.changeMyImageOp}
                    />
                </WorkspaceDiv>
            </div>
        )
    }
}