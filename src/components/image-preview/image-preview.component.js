import React, { Component } from 'react';
import { ToggleButton, ButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';
import Canvas from './canvas/canvas.component';
import MyImage from './my-image/my-image.component';

const ImagePreviewCanvas = styled.div`
    width: 24rem;
    background-color: #e9ecef;
    box-shadow: 0 1px 4px #e9ecef;
    padding: 10px;
`;

export default class ImagePreview extends Component {
    renderMyImage(image, key) {
        return (
            <MyImage
                key={"myimage-" + key}
                num={key}
                image={image} 
                boardX={this.props.boardX}
                boardY={this.props.boardY} 
                myimages={this.props.myimages}
                myimageop={this.props.myimageop}
                maincanvas={this.props.canvas} 
                onCanvasChange={this.props.onCanvasChange} ></MyImage>
        )
    }

    render() {
        return (
            <ImagePreviewCanvas>
                <div style={{margin: "10px"}}>
                    Image Preview (right click to save)
                </div>
                <p>20 x 20</p>
                <Canvas 
                    canvas={this.props.canvas}
                    boardX={this.props.boardX}
                    boardY={this.props.boardY}
                    canvasWidth={20}
                    canvasHeight={20} />
                <p>200 x 200</p>
                <Canvas 
                    canvas={this.props.canvas}
                    boardX={this.props.boardX}
                    boardY={this.props.boardY}
                    canvasWidth={200}
                    canvasHeight={200} />
                <p>My Images</p>
                <div>
                    <ButtonGroup toggle>
                        <ToggleButton
                            key="loadonclick"
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value="load"
                            checked={this.props.myimageop === "load"}
                            onChange={(e) => this.props.onMyImageOpChange(e.currentTarget.value)}>
                            Load On Click
                        </ToggleButton>
                        <ToggleButton
                            key="saveonclick"
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value="save"
                            checked={this.props.myimageop === "save"}
                            onChange={(e) => this.props.onMyImageOpChange(e.currentTarget.value)}>
                            Save On Click
                        </ToggleButton>
                    </ButtonGroup>
                </div>
                {
                    this.props.myimages.map((image, key) => this.renderMyImage(image, key))
                }
            </ImagePreviewCanvas>
        )
    }
}