import React, { Component } from 'react';
import { Form, Search, Button } from 'semantic-ui-react';
import "../../css/notice.css";
import GetNotices from "../actions/get_notices";
import { connect } from "react-redux";
import {initial_page, search_keyword} from "../constants/constants";



const mapStateToProps = state => {
    console.log(state);
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
         console.log(this.state.value);
         this.props.GetNotices(initial_page, this.state.value);
    }


    render () {

        return (
            <div className='tab-common-elements'>
                <Form onSubmit={this.handleSubmit} className='search-form'>
                    <Search className='search-bar'
                            onSearchChange={this.handleChange}
                            type='text'
                            value={this.state.value}/>
                </Form>

                <Button basic className='tab-button'>Bookmarks</Button>
                <Button basic className='tab-button'>Home</Button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (TabCommonElements);