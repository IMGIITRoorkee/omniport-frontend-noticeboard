import React, { Component } from 'react';
import { Menu, Icon, Container } from 'semantic-ui-react';
import "../../css/notice.css"

export default class Pagination extends Component {
    render () {
        return (
            <Container className='pagination'>
                    <Menu pagination>
                        <Menu.Item as='a' icon>
                            <Icon name='chevron left' />
                        </Menu.Item>
                        <Menu.Item as='a'>1</Menu.Item>
                        <Menu.Item as='a'>2</Menu.Item>
                        <Menu.Item as='a'>3</Menu.Item>
                        <Menu.Item as='a'>4</Menu.Item>
                        <Menu.Item as='a' icon>
                            <Icon name='chevron right' />
                        </Menu.Item>
                    </Menu>
            </Container>
        )
    }
}