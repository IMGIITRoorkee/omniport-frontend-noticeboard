import React, { Component } from 'react';
import { Form, Search, Button, Menu } from 'semantic-ui-react';
import notice_css from "../css/notice.css";
import { connect } from "react-redux";
import {initial_page} from "../constants/constants";


const mapStateToProps = state => {
    return {
        expired: state.GetNotices.expired,
        banner_id: state.GetNotices.banner_id,
    };
};

class TabCommonElements extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit() {
        this.props.history.push({pathname: '/noticeboard/',
            state: {page: initial_page,
                    search_keyword: this.state.value,
                    narrow_bookmark: false,
                    banner_id: this.props.banner_id,
                    expired: this.props.expired}});
    }

    goHome(path) {
      this.props.history.push({pathname: path, state: {page: initial_page, narrow_bookmark: false}});
    }

    narrowBookmarks(path) {
       this.props.history.push({pathname: path, state: {page: initial_page, narrow_bookmark: true}});
    }

    render () {
        return (
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Form onSubmit={this.handleSubmit}>
                        <Search styleName='notice_css.input-bar'
                            onSearchChange={this.handleChange}
                            type='text'
                            showNoResults={false}
                            value={this.state.value}/>
                    </Form>
                </Menu.Item>
                <Menu.Item>
                    <Button basic styleName='notice_css.tab-button'
                        onClick={() => this.narrowBookmarks('/noticeboard/')}>Bookmarks</Button>
                    <Button basic styleName='notice_css.tab-button'
                        onClick={() => this.goHome('/noticeboard/')}>Home</Button>
                </Menu.Item>
            </Menu.Menu>
        )
    }
}

export default connect(mapStateToProps) (TabCommonElements);