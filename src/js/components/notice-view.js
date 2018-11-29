import React, { Component } from 'react';
import { Container, Divider, Segment, Header } from 'semantic-ui-react';
import "../../css/notice.css";
import { Editor } from '@tinymce/tinymce-react';


export default class NoticeView extends Component {
    render () {
        return <Container className="notice-box">

            <Segment.Group raised>
                <Segment as='h5'>Subject:  Schedule for interview</Segment>

                <Segment>
                    <p className="notice-posted-by">Posted by:  Placement Office</p>
                    <p>Posted on:  20th September, 2018</p>
                </Segment>

                <Divider fitted/>

                <Container textAlign='justified' className="notice-view-container">
                    <Header as='h2' className='notice-box-header'>Schedule for interview</Header>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                        Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                        ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
                        consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                        arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu
                        pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.
                        Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend
                        ac, enim.
                    </p>

                    <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                        Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                        ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
                        consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                        arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu
                        pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.
                        Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend
                        ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
                        nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel
                        augue. Curabitur ullamcorper ultricies nisi.
                    </p>
                </Container>
            </Segment.Group>
        </Container>
    }
}