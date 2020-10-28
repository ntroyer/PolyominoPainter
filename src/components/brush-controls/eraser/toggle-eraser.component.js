import React, { Component } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default class ToggleEraser extends Component {
    constructor(props) {
        super();

        this.state = {
            checked: false
        }
    }

    setChecked(checked) {
        this.props.onToggleEraser();
    }

    render() {
        return (
            <ButtonGroup toggle>
                <ToggleButton 
                    type="checkbox" 
                    value="1" 
                    variant="secondary"
                    checked={this.props.isEraserOn}
                    onChange={(e) => this.setChecked(e.currentTarget.checked)}
                >
                    Toggle Eraser
                </ToggleButton>
            </ButtonGroup>
        );
    }
}