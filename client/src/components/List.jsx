import React, { Component } from "react";

import MaterialIcon from "@material/react-material-icon";

export class List extends Component {
  state = {};

  handleDelete = (i) => {
    let isConfirm = window.confirm("Are you sure?");
    if (isConfirm) {
      let items = this.props.items;
      items.splice(i, 1);
      localStorage.setItem("todo", JSON.stringify(items));
      this.props.onDeleted();
    }
  };

  render() {
    return (
      <div>
        {this.props.items.map((x, index) => {
          return (
            <div className="list">
              <p key={index}>
                {x}
                <span>
                  <MaterialIcon id='edit' icon="edit" />
                </span>
                <span onClick={() => this.handleDelete(index)}>
                  <MaterialIcon icon="delete" />
                </span>{" "}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}
