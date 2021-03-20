import React, {Component} from 'react';
import AppHeader from "../app-header/AppHeader";
import SearchPanel from "../search-panel/SearchPanel";
import TodoList from "../todo-list/TodoList";
import update from 'immutability-helper';
import ItemAddForm from "../item-add-form/ItemAddForm";
import './App.css';


export default class App extends Component{

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch'),
        ],
        filter: 'all',
        inputSearchValue: ''
    };

    createTodoItem(label){
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    };

    deleteItem = (id) =>{
        this.setState(({todoData}) =>{
            const idx = todoData.findIndex(el => el.id === id);
            let newArray = update(todoData, {$splice: [[idx, 1]]});
            return {todoData: newArray}
        });
    };

    addItem = (text) =>{
        const newItem = this.createTodoItem(text);

        this.setState(({todoData}) =>{
            const newArr = [ ...todoData, newItem ];
            return {todoData: newArr}
        });
    };

    toggleProperty = (arr, id, propName) =>{
        const idx = arr.findIndex(el => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem.[propName]};

        return [
            ...arr.slice(0, idx), newItem,
            ...arr.slice(idx + 1)
        ];
    };

    onToggleImportant = (id) =>{
        this.setState(({todoData}) =>{
            return{
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    };

    onToggleDone = (id) =>{
        this.setState(({todoData}) =>{
            return{
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };

    onSearchChange = (inputSearchValue) =>{
        this.setState({inputSearchValue});
    };

    search = (items, inputSearchValue) =>{
        if(inputSearchValue === 0) return items;
        return items.filter((item) =>{
            return item.label.toLowerCase()
                .indexOf(inputSearchValue.toLowerCase()) > -1;
        });
    };

    onFilterChange = (filter) =>{
        this.setState({filter});
    };

    filter = (items, filter) =>{
          switch (filter) {
              case 'all':
                  return items;
              case 'active':
                  return items.filter(item => !item.done);
              case 'done':
                  return items.filter(item => item.done);
              default:
                  return items;
          }
    };


    render() {
        const {todoData, inputSearchValue, filter} = this.state;
        const visibleItems = this.filter(
            this.search(todoData, inputSearchValue), filter);

        const doneCount = todoData.filter(el => el.done).length;
        const todoCount = todoData.length - doneCount;

        return(
            <div className="app">
                <AppHeader
                    toDo={todoCount}
                    done={doneCount} />
                <SearchPanel
                    onSearchChange={this.onSearchChange}
                    filter={filter}
                    onFilterChange={this.onFilterChange}/>
                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}/>
                <ItemAddForm
                    addItem={this.addItem}/>
            </div>
        );
    }
};