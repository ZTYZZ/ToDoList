import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.state = {
            list: [],
            inputValue: ""
        }
    }

    handleBtnClick() {
        this.setState({
            list: [...this.state.list, this.state.inputValue],
            inputValue: ""
        });
    }

    handleInputChange(e) {
        this.setState({
            inputValue: e.target.value,
        });
    }
    handleRemove(index) {
        const list = [...this.state.list];
        list.splice(index,1);
        this.setState({
            list: list
        });
    }
    render() {
        return (
            <div>
                <h1>须臾待办事项</h1>
                <p>今天的日期为{Date()}</p>
                <div>
                    <input value={this.state.inputValue} onChange={this.handleInputChange} type="text"/>
                    <button onClick={this.handleBtnClick}>添加待办</button>
                </div>
                <ul>
                    {
                        this.state.list.map((item, index) => {
                            return <TodoItem remove={this.handleRemove}key={index} content={item} index={index}/>;
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default TodoList;