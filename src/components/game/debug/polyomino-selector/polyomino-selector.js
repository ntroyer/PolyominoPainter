import React, { Component } from 'react';
import styled from 'styled-components';
import SelectablePolyomino from './selectable-polyomino';
import { polyominos } from '../../../../data/polyominos';

const SelectorDiv = styled.div`
    display: flex;
    height: 120px;
    width: 300px;
    outline: 2px solid black;
`;

export default class PolyominoSelector extends Component {
    constructor(props) {
        super();

        this.state = {
            polyominos: this.shufflePolyominos().slice(0, 3)
        }
    }

    setCurrentPolyomino(polyo) {
        this.props.onPolyoChange(polyo);
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
            <SelectorDiv>
                {
                    this.state.polyominos.map((polyo) => (
                        <SelectablePolyomino 
                            key={'selectable_' + polyo.name}
                            setCurrentPolyomino={() => this.setCurrentPolyomino(polyo.data)}
                            currentPrimaryColor={this.props.currentPrimaryColor}
                            polyomino={polyo.data}
                        />
                    ))
                }
            </SelectorDiv>
        );
    }
}
