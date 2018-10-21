import React, { Component } from 'react';
import { Icon, Table } from 'semantic-ui-react';


export default class Notice extends Component {
    render () {
        return (
            <Table.Row>
                <Table.Cell className='cell-width-1'>
                    <Icon name='square outline' />
                </Table.Cell>
                <Table.Cell className='cell-width-1'>
                    <Icon name='bookmark outline' />
                </Table.Cell>
                <Table.Cell className='cell-width-2'>
                    08:00 PM
                </Table.Cell>
                <Table.Cell width={2}>
                    Today
                </Table.Cell>
                <Table.Cell width={2}>
                    Academics
                </Table.Cell>
                <Table.Cell collapsing>
                    Applications are invited for the position
                </Table.Cell>
            </Table.Row>
        )
    }
}
