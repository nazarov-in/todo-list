import React, {Component} from 'react';
import ItemStatusFilter from "../item-status-filter/ItemStatusFilter";
import './SearchPanel.css';


export default class SearchPanel extends Component{
    state = {
        value: ''
    };

    onInputChange = (e) =>{
        const value = e.target.value;
        this.setState({value});

        this.props.onSearchChange(value);
    };

    render(){
        const {filter, onFilterChange} = this.props;
        return(
            <div className="d-flex mb-2 mt-3">
                <input
                    className="search-input form-control"
                    type="search"
                    placeholder="search"
                    onChange={this.onInputChange}
                    value={this.state.value}/>
                <ItemStatusFilter
                    filter={filter}
                    onFilterChange={onFilterChange}/>
            </div>
        )
    }
}