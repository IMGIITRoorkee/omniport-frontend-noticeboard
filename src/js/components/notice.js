import React from 'react';
import { Icon, Table } from 'semantic-ui-react';


const Notice = ({id, time, date, banner, title, history}) => {

    const OpenNotice = (e) => {
        history.push('/notice/'+id);
    };

    return (
        <Table.Row className='notice-row'>
            <Table.Cell className='cell-width-1'>
                <Icon name='square outline'/>
            </Table.Cell>
            <Table.Cell className='cell-width-1'>
                <Icon name='bookmark outline'/>
            </Table.Cell>
            <Table.Cell className='cell-width-2 cell-hover'>
                {time}
            </Table.Cell>
            <Table.Cell width={2} onClick={OpenNotice} className='cell-hover'>
                {date}
            </Table.Cell>
            <Table.Cell width={3} onClick={OpenNotice} className='cell-hover'>
                {banner}
            </Table.Cell>
            <Table.Cell collapsing onClick={OpenNotice} className='cell-hover'>
                {title}
            </Table.Cell>
        </Table.Row>
    )
};

export default Notice;