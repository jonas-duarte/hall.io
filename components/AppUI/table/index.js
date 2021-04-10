import React, { Component } from 'react';

class Table extends Component {
  state = { data: null }

  render() {
    const { columns, data } = this.props;

    if (!data) return <div>Loading...</div>

    return (
      <div className="tableComponent">
        <table>
          <thead>
            <tr>
              {columns.map((column, i) => (
                <th key={`header-${i}`}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, itemIndex) => (
              <tr key={`data-${itemIndex}`}>
                {columns.map((column, columnIndex) => (
                  <td
                    key={`data-${columnIndex}-${itemIndex}`}
                  >
                    {item[column.name]}
                  </td>)
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>);
  }
}

export default Table;
