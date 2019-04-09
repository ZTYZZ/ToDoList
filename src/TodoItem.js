import React, { Component } from "react";

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove() {
        this.props.remove(this.props.index);
    }
    render() {
        return (
            <div>{this.props.content}<button onClick={this.handleRemove}>删除</button></div>
        );
    }
}

export default TodoItem;