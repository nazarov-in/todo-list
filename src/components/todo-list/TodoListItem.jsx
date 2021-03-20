import React from 'react';
import './TodoListItem.css';


const TodoListItem = ({label, onDeleted, onToggleImportant, onToggleDone, important, done}) =>{

    const style = {
        color: important ? '#17a2b8' : 'black',
        fontWeight: important ? 'bold' : 500
    };

    let className = 'todo-list-item';
    if(done) className += ' done';

    if(important) className += ' important';

    return(
        <span className={className}>
            <span
                style={style}
                className="todo-list-label"
                onClick={onToggleDone}>
                { label }
            </span>
            <div className="">
                <button
                    type="button"
                    className="btn btn-outline-success btn-sm"
                    onClick={onToggleImportant}>
                    <i className="fa fa-exclamation"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={onDeleted}>
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </span>
    );
};

export default TodoListItem;