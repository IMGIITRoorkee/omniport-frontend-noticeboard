import React, { Component } from 'react';
import { Search, Button } from 'semantic-ui-react';
import "../../css/notice.css";

export default class TabCommonElements extends Component {
    render () {
        return (
            <div className='tab-common-elements'>
                <Search className='search-bar'/>

                <Button basic className='tab-button'>Bookmarks</Button>
                <Button basic className='tab-button'>Home</Button>
            </div>
        )
    }
}