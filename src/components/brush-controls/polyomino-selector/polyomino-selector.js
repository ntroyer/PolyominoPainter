import React, { Component } from 'react';
import styled from 'styled-components';
import SelectablePolyomino from './selectable-polyomino';

const SelectorDiv = styled.div`
    display: flex;
    height: 7rem;
    width: 300px;
    outline: 2px solid black;
    background-color: white;
    cursor: pointer;
`;

export default class PolyominoSelector extends Component {
    getIsSelected(key) {
        return key === this.props.currentUserPolyoId;
    }

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
                            isCurrent={this.getIsSelected(key)}
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
