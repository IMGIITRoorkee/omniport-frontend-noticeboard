import React, { Component } from 'react';
import { Form, Search, Button } from 'semantic-ui-react';
import notice_css from "../css/notice.css";
import GetNotices from "../actions/get_notices";
import { connect } from "react-redux";
import {initial_page} from "../constants/constants";


const mapStateToProps = state => {
    return {
        state: state,
    };
};

const mapDispatchToProps = dispatch => {
  return {
    GetNotices: (page, search_keyword) => {
      dispatch(GetNotices(page, search_keyword))
    }
  }
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
         this.props.GetNotices(initial_page, this.state.value);
    }

    goHome(path) {
      this.props.history.push({pathname: path, state: {page: initial_page, narrow_bookmark: false}});
    }

    narrowBookmarks(path) {
       this.props.history.push({pathname: path, state: {page: initial_page, narrow_bookmark: true}});
    }

    render () {

        return (
            <div styleName='notice_css.tab-common-elements'>
                <Form onSubmit={this.handleSubmit} styleName='notice_css.search-form'>
                    <Search styleName='notice_css.search-bar'
                            onSearchChange={this.handleChange}
                            type='text'
                            showNoResults={false}
                            value={this.state.value}/>
                </Form>

                <Button basic styleName='notice_css.tab-button'
                        onClick={() => this.narrowBookmarks('/noticeboard/')}>Bookmarks</Button>
                <Button basic styleName='notice_css.tab-button'
                        onClick={() => this.goHome('/noticeboard/')}>Home</Button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (TabCommonElements);