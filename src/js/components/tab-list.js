import React, { Component } from 'react';
import { Container, Dropdown, Search, Button } from 'semantic-ui-react';
import "../../css/notice.css";

export default class TabList extends Component {
    render () {
        return (
            <Container className='tab-list'>
                <Dropdown text='All Notices' className='tab-dropdown'>
                    <Dropdown.Menu>
                        <Dropdown.Item text='All Notices' />
                        <Dropdown.Item text='Authorities' />
                        <Dropdown.Item text='Departments' />
                        <Dropdown.Item text='Placement Office' />
                        <Dropdown.Item text='Expired' />
                    </Dropdown.Menu>
                </Dropdown>

                 <Dropdown text='Date' className='tab-dropdown'>
                </Dropdown>

                <Search className='search-bar'></Search>

                <Button basic className='tab-button'>Bookmarks</Button>
                <Button basic className='tab-button'>Home</Button>
            </Container>
        )
    }
}
