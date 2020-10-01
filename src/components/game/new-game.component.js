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
            isEraserOn: false
        }

        this.changePlayer = this.changePlayer.bind(this);
        this.changePrimaryColor = this.changePrimaryColor.bind(this);
        this.changePolyo = this.changePolyo.bind(this);
        this.changePlayerSquares = this.changePlayerSquares.bind(this);
        this.changeBoardSize = this.changeBoardSize.bind(this);
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
        this.setState(state => ({
            currentPolyo: polyo
        }));
    }

    changePlayerSquares(squares) {
        this.setState(state => ({
            playerSquares: squares
        }));
    }

    changeBoardSize(x, y) {
        this.setState(state => ({
            xSquares: x,
            ySquares: y
        }));
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