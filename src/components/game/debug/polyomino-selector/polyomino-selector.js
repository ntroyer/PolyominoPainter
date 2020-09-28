import React, { Component } from 'react';
import styled from 'styled-components';
import SelectablePolyomino from './selectable-polyomino';

const SelectorDiv = styled.div`
    display: flex;
    height: 120px;
    width: 300px;
    outline: 2px solid black;
    overflow-x: scroll;
`;

export default class PolyominoSelector extends Component {
    constructor(props) {
        super();

        this.state = {
            polyominos: [
                {
                    name: 'lthing',
                    data: [
                        [-1, 1],
                        [0, 1],
                        [0, -1],
                        [1, 0],
                        [2, 0]
                    ]
                },
                {
                    name: 'tshape',
                    data: [
                        [-1, -1],
                        [-1, 0],
                        [-1, 1],
                        [1, 0],
                        [2, 0]
                    ]
                },
                {
                    name: 'stairs',
                    data: [
                        [-1, -1],
                        [0, -1],
                        [1, 0],
                        [1, 1],
                        [2, 1]
                    ]
                },
                {
                    name: 'doublel',
                    data: [
                        [-1, -1],
                        [-1, 0],
                        [1, 0],
                        [2, 0],
                        [2, 1]
                    ]
                }
            ]
        }
    }

    setCurrentPolyomino(polyo) {
        this.props.onPolyoChange(polyo);
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
