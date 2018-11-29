import React from 'react';
import { Icon, Table } from 'semantic-ui-react';


const Notice = ({time, date, banner, title}) => {

    return (
        <Table.Row>
            <Table.Cell className='cell-width-1'>
                <Icon name='square outline'/>
            </Table.Cell>
            <Table.Cell className='cell-width-1'>
                <Icon name='bookmark outline'/>
            </Table.Cell>
            <Table.Cell className='cell-width-2'>
                {time}
            </Table.Cell>
            <Table.Cell width={2}>
                {date}
            </Table.Cell>
            <Table.Cell width={3}>
                {banner}
            </Table.Cell>
            <Table.Cell collapsing>
                {title}
            </Table.Cell>
        </Table.Row>
    )
};

export default Notice;