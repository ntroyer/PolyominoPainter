import React, { Component } from 'react';
import styled from 'styled-components';
import SelectablePolyomino from './selectable-polyomino';

const SelectorDiv = styled.div`
    display: flex;
    height: 100px;
    width: 300px;
    outline: 2px solid black;
    background-color: white;
    cursor: pointer;
`;

export default class PolyominoSelector extends Component {
    setCurrentPolyomino(polyo, key) {
        this.props.onUserPolyoChange(key);
        this.props.onPolyoChange(polyo, true);
    }

    render() {
        return (
            <SelectorDiv>
                {
                    this.props.selectablePolyos.map((polyo, key) => (
                        <SelectablePolyomino 
                            key={'selectable_' + polyo.name}
                            setCurrentPolyomino={() => this.setCurrentPolyomino(polyo.data, key)}
                            currentPrimaryColor={this.props.currentPrimaryColor}
                            polyomino={polyo.data}
                        />
                    ))
                }
            </SelectorDiv>
        );
    }
}
