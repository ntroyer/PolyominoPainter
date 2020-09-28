import React, { Component } from 'react';
import styled from 'styled-components';

import Board from "./board/board.component";
import PlayerTest from "./debug/player-test.component";

const Game = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
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
            playerSquares: []
        }

        this.changePlayer = this.changePlayer.bind(this);
        this.changePrimaryColor = this.changePrimaryColor.bind(this);
        this.changePolyo = this.changePolyo.bind(this);
        this.changePlayerSquares = this.changePlayerSquares.bind(this);
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

    render() {
        return (
            <Game>
                <PlayerTest 
                    currentPlayer={this.state.currentPlayer} 
                    currentPolyo={this.state.currentPolyo}
                    playerSquares={this.state.playerSquares}
                    onPrimaryColorChange={this.changePrimaryColor}
                    onPlayerChange={this.changePlayer} 
                    onPolyoChange={this.changePolyo}
                />
                <Board 
                    currentPlayer={this.state.currentPlayer}
                    currentPolyo={this.state.currentPolyo}
                    playerSquares={this.state.playerSquares}
                    onPlayerSquaresChange={this.changePlayerSquares}
                    boardX={20}
                    boardY={20}
                />
            </Game>
        )
    }
}