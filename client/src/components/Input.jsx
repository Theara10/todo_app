import React, { Component } from "react";

export class Input extends Component {
  state = {};

  handleSubmit = (e) => {
    let data = e.target.todo.value;
    this.props.onSubmit(data);
    e.target.todo.value = '';
  }

  render() {
    return (
      <div className='input-form'>
        <form className="" onSubmit={(e) => {
          e.preventDefault()
          let item = localStorage.getItem('todo') === null ? []: JSON.parse(localStorage.getItem('todo'));
          console.log('shit', typeof item)
          localStorage.setItem('todo', JSON.stringify([...item, e.target.todo.value]))
          this.handleSubmit(e);
        }}>
          
            <input
              type="text"
              className=""
              id="inputPassword2"
              placeholder="New todo"
              name="todo"
            />
         
          <button type="submit">
            Add
          </button>
         
        </form>
      </div>
      
    );
  }
}
