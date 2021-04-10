import React, { Component } from "react";

class Table extends Component {
  state = { data: null };

  createCell({ type, name }, item, itemIndex) {
    const { name: tableName, customEvent } = this.props;
    switch (type) {
      case "button":
        return (
          <button
            onClick={() =>
              customEvent({ name: tableName, index: itemIndex, event: name })
            }
          >
            {name}
          </button>
        );
      default:
        return item[name];
    }
  }

  render() {
    const { columns, data } = this.props;

    if (!data) return <div>Loading...</div>;

    return (
      <div className="tableComponent">
        <table>
          <thead>
            <tr>
              {columns.map((column, i) => (
                <th key={`header-${i}`}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, itemIndex) => (
              <tr key={`data-${itemIndex}`}>
                {columns.map((column, columnIndex) => (
                  <td key={`data-${columnIndex}-${itemIndex}`}>
                    {this.createCell(column, item, itemIndex)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
