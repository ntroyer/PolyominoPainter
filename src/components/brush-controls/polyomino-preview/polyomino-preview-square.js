import React, { Component } from 'react';
import styled from 'styled-components';

const PreviewSquare = styled.td`
    width: ${props => (props.width)}px;
    height: ${props => (props.height)}px;
    background: ${props => (props.isAssigned ? props.currentColor : "")};
    text-align: center;
    border: 2px solid black;
    cursor: pointer;

    &.is-center {
        outline-color: red;
        outline-style: dashed;
        outline-width: 5px;
    }
`;


export default class PolyominoPreviewSquare extends Component {
    render() {
        return (
            <PreviewSquare 
                width={this.props.width}
                height={this.props.height}
                className={this.props.isCenter ? "is-center" : ""}
                currentColor={this.props.currentPrimaryColor}
                isAssigned={this.props.isAssigned} 
                onClick={() => this.props.onPolyominoUpdate()} />
        )
    }
}