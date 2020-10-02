import React, { Component } from 'react';
import styled from 'styled-components';

import Board from "./board/board.component";
import PlayerTest from "./debug/player-test.component";
import ImagePreview from "./image-preview/image-preview.component";

const Game = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
`;

const TableDiv = styled.div`
    flex: 0 0 100em;
    margin: 10px auto;
`;

export default class NewGame extends Component {
    constructor(props) {
        super();

        this.state = {
            currentPlayer: 1,
            currentPolyo: [
                [-1, 0], [-1, -1], [1, 0], [0, 1], [0, 2]
            ],
            primaryColor: "blue",
            playerSquares: [],
            xSquares: Number(process.env.REACT_APP_BOARD_NUM_SQUARES_X),
            ySquares: Number(process.env.REACT_APP_BOARD_NUM_SQUARES_Y),
            isEraserOn: false,
            playerSquaresHistory: [],
            currentPolyoHistory: [
                [
                    [-1, 0], [-1, -1], [1, 0], [0, 1], [0, 2]
                ]
            ],
            playerSquaresStep: 0,
            currentPolyoStep: 0
        }

        this.changePlayer = this.changePlayer.bind(this);
        this.changePrimaryColor = this.changePrimaryColor.bind(this);
        this.changePolyo = this.changePolyo.bind(this);
        this.changePlayerSquares = this.changePlayerSquares.bind(this);
        this.changeBoardSize = this.changeBoardSize.bind(this);
        this.changePolyoHistory = this.changePolyoHistory.bind(this);
        this.changeSquaresHistory = this.changeSquaresHistory.bind(this);
        this.toggleEraser = this.toggleEraser.bind(this);
    }

    changePlayer(player) {
        this.setState(state => ({
            currentPlayer: player
        }));
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
        this.setState(state => ({
            playerSquares: squares,
            playerSquaresHistory: this.state.playerSquaresHistory.concat([squares]),
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
        if (isUndo) {
            const stepBack = this.state.currentPolyoStep - 1;
            if (typeof this.state.currentPolyoHistory[stepBack] !== 'undefined') {
                this.setState(state => ({
                    currentPolyo: this.state.currentPolyoHistory[stepBack],
                    currentPolyoStep: stepBack
                }));
            }
        } else {
            const stepForward = this.state.currentPolyoStep + 1;

            if (typeof this.state.currentPolyoHistory[stepForward] !== 'undefined') {
                this.setState(state => ({
                    currentPolyo: this.state.currentPolyoHistory[stepForward],
                    currentPolyoStep: stepForward
                }));
            }
        }
    }

    changeSquaresHistory(isUndo) {
        if (isUndo) {
            this.setState(state => ({

            }));
        } else {
            this.setState(state => ({

            }));
        }
    }

    toggleEraser(isEraserOn) {
        this.setState(state => ({
            isEraserOn: isEraserOn
        }))
    }

    render() {
        return (
            <Game>
                <PlayerTest 
                    currentPrimaryColor={this.state.primaryColor}
                    currentPlayer={this.state.currentPlayer} 
                    currentPolyo={this.state.currentPolyo}
                    playerSquares={this.state.playerSquares}
                    isEraserOn={this.state.isEraserOn}
                    onPrimaryColorChange={this.changePrimaryColor}
                    onPlayerChange={this.changePlayer} 
                    onPlayerSquaresChange={this.changePlayerSquares}
                    onPolyoChange={this.changePolyo}
                    onBoardSizeChange={this.changeBoardSize}
                    onToggleEraser={this.toggleEraser}
                    onUndoPolyo={this.changePolyoHistory}
                    onRedoPolyo={this.changePolyoHistory}
                    boardX={this.state.xSquares}
                    boardY={this.state.ySquares}
                />
                <TableDiv>
                    <Board 
                        currentPrimaryColor={this.state.primaryColor}
                        currentPlayer={this.state.currentPlayer}
                        currentPolyo={this.state.currentPolyo}
                        playerSquares={this.state.playerSquares}
                        isEraserOn={this.state.isEraserOn}
                        onPlayerSquaresChange={this.changePlayerSquares}
                        boardX={this.state.xSquares}
                        boardY={this.state.ySquares}
                    />
                </TableDiv>
                <ImagePreview 
                    playerSquares={this.state.playerSquares}
                    boardX={this.state.xSquares}
                    boardY={this.state.ySquares} />
            </Game>
        )
    }
}