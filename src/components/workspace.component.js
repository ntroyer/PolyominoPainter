import React, { Component } from 'react';
import styled from 'styled-components';

import Board from "./board/board.component";
import BrushControls from "./brush-controls/brush-controls.component";
import ImagePreview from "./image-preview/image-preview.component";

const WorkspaceDiv = styled.div`
    display: flex;
    justify-content: center;
    height: 95.8vh;
`;

export default class Workspace extends Component {
    constructor(props) {
        super();

        this.state = {
            currentPolyo: [
                [-1, 0], [-1, -1], [1, 0], [0, 1], [0, 2]
            ],
            primaryColor: "blue",
            playerSquares: [],
            xSquares: Number(process.env.REACT_APP_BOARD_NUM_SQUARES_X),
            ySquares: Number(process.env.REACT_APP_BOARD_NUM_SQUARES_Y),
            isEraserOn: false,
            isColorSelectorOn: false,
            playerSquaresHistory: [
                []
            ],
            currentPolyoHistory: [
                [
                    [-1, 0], [-1, -1], [1, 0], [0, 1], [0, 2]
                ]
            ],
            playerSquaresStep: 0,
            currentPolyoStep: 0,
            matIconSize: 50
        }

        this.changePrimaryColor = this.changePrimaryColor.bind(this);
        this.changePolyo = this.changePolyo.bind(this);
        this.changePlayerSquares = this.changePlayerSquares.bind(this);
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

    changePlayerSquares(squares) {
        const history = this.state.playerSquaresHistory.slice(0, this.state.playerSquaresStep + 1);
        this.setState(state => ({
            playerSquares: squares,
            playerSquaresHistory: history.concat([squares]),
            playerSquaresStep: this.state.playerSquaresStep + 1
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
        const newStep = isUndo ? this.state.playerSquaresStep - 1 : this.state.playerSquaresStep + 1;
        if (typeof this.state.playerSquaresHistory[newStep] !== 'undefined') {
            this.setState(state => ({
                playerSquares: this.state.playerSquaresHistory[newStep],
                playerSquaresStep: newStep
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
                    playerSquares={this.state.playerSquares}
                    isEraserOn={this.state.isEraserOn}
                    isColorSelectorOn={this.state.isColorSelectorOn}
                    onPrimaryColorChange={this.changePrimaryColor}
                    onPlayerChange={this.changePlayer} 
                    onPlayerSquaresChange={this.changePlayerSquares}
                    onPolyoChange={this.changePolyo}
                    onToggleEraser={this.toggleEraser}
                    onToggleColorSelector={this.toggleColorSelector}
                    onUndoPolyo={this.changePolyoHistory}
                    onRedoPolyo={this.changePolyoHistory}
                    matIconSize={this.state.matIconSize}
                />
                <Board 
                    currentPrimaryColor={this.state.primaryColor}
                    currentPolyo={this.state.currentPolyo}
                    playerSquares={this.state.playerSquares}
                    isEraserOn={this.state.isEraserOn}
                    isColorSelectorOn={this.state.isColorSelectorOn}
                    onPrimaryColorChange={this.changePrimaryColor}
                    onPlayerSquaresChange={this.changePlayerSquares}
                    onToggleColorSelector={this.toggleColorSelector}
                    matIconSize={this.state.matIconSize}
                    onBoardSizeChange={this.changeBoardSize}
                    onUndoCanvas={this.changeSquaresHistory}
                    onRedoCanvas={this.changeSquaresHistory}
                    boardX={this.state.xSquares}
                    boardY={this.state.ySquares}
                />
                <ImagePreview 
                    playerSquares={this.state.playerSquares}
                    boardX={this.state.xSquares}
                    boardY={this.state.ySquares} />
            </WorkspaceDiv>
        )
    }
}