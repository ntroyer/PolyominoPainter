import React, { Component } from 'react';
import styled from 'styled-components';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaEraser } from 'react-icons/fa';

const Eraser = styled(FaEraser)`
    cursor: pointer;
`;

export default class ToggleEraser extends Component {
    constructor(props) {
        super();

        this.state = {
            checked: false
        }
    }

    setChecked(checked) {
        this.setState({
            checked: checked
        });

        this.props.onToggleEraser(checked);
    }

    render() {
        return (
            <ButtonGroup toggle>
                <ToggleButton 
                    type="checkbox" 
                    value="1" 
                    variant="secondary"
                    checked={this.state.checked}
                    onChange={(e) => this.setChecked(e.currentTarget.checked)}
                >
                    Toggle Eraser
                </ToggleButton>
            </ButtonGroup>
        );
    }
}