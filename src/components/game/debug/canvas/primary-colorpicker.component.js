import React, { Component } from 'react';
import { SliderPicker } from 'react-color';

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
    }

    handleChangeComplete(color) {
        this.setState({ color: color.hex})
    }

    render() {
        return (
            <SliderPicker 
                color={this.state.color} 
                onChange={this.handleColorChange} 
                onChangeComplete={this.handleChangeComplete} />
        )
    }
}