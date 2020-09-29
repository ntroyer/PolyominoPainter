import React, { Component } from 'react';
import styled from 'styled-components';
import { SliderPicker } from 'react-color';

const StyledPicker = styled(SliderPicker)`
    margin: 10px auto;
`;

export default class PrimaryPicker extends Component {
    constructor(props) {
        super();
        this.state = {
            color: 'blue'
        }

        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    handleColorChange(color, event) {
        this.setState({ color: color.hex })

        this.props.onColorChange(color.hex);
    }

    handleChangeComplete(color) {
        this.setState({ color: color.hex })

        this.props.onColorChange(color.hex);
    }

    render() {
        return (
            <StyledPicker 
                color={this.state.color} 
                onChange={this.handleColorChange} 
                onChangeComplete={this.handleChangeComplete} />
        )
    }
}