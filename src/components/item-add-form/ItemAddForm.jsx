import React, {Component} from 'react';
import './ItemAddForm.css';


export default class ItemAddForm extends Component {

    state = {
        label: '',
    };

    onLabelChange = (e) =>{
        this.setState({label: e.target.value});
    };

    onSubmit = (e) =>{
        e.preventDefault();
        const input = e.target.elements[0];
        if(input.value !== '') this.props.addItem(this.state.label);
        this.setState({label: ''});
    };

    render() {
        return(
            <form className="mt-2 d-flex"
                  onSubmit={this.onSubmit}>
                <input
                    type="text"
                    className="form-control mr-1"
                    placeholder="What needs to be done"
                    onChange={this.onLabelChange}
                    value={this.state.label}/>
                <button
                    className="btn btn-outline-secondary">
                    AddItem
                </button>
            </form>
        )
    }
};