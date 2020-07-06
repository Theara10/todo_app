import React, { Component } from "react";

import MaterialIcon from '@material/react-material-icon';

export class List extends Component {
  state = {};

  handleDelete = (i) => {
    let isConfirm = window.confirm('Are you sure?')
    if(isConfirm){
      const items = this.props.items;
      items.splice(i, 1)
      this.props.onDeleted(items);
      localStorage.setItem('todo', JSON.stringify(items))
    }
  }

  render() {
    return (
      <div>
        
          {this.props.items.map((x, index) => {
            return (
              <div key={index} className="list">
                <p>{x} <span onClick={(index) => this.handleDelete(index)}><MaterialIcon icon='delete' /></span></p>
              </div>
            );
          })}
      </div>
    );
  }
}
