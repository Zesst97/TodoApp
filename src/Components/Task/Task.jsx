import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './Task.css';

export default class Task extends Component {
  handleChange = (event) => {
    const { onChange } = this.props;
    const { value } = event.target;
    onChange(value);
  };

  handleSubmit = (event) => {
    const { onSubmit, id } = this.props;
    event.preventDefault();
    onSubmit(id);
  };

  render() {
    const { name, id, status, isCompleted, isEditing, onClick, onDelete, onEdit, value } = this.props;
    if (isEditing) {
      return (
        <li className="editing">
          <div className="view"> </div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="edit" value={value} onChange={this.handleChange} />
          </form>
        </li>
      );
    }
    return (
      <li className={isCompleted ? 'completed' : ''}>
        <div className="view">
          <input className="toggle" checked={isCompleted} type="checkbox" onClick={() => onClick(id)} onChange={(e) => e.target.checked} />
          <label onClick={() => onClick(id)}>
            <span className="description">{name}</span>
            <span className="created">
              {`created ${formatDistanceToNow(status.toString(), {
                includeSeconds: true,
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button aria-label="edit form" type="button" className="icon icon-edit" onClick={() => onEdit(id)} />
          <button aria-label="delete form" type="button" className="icon icon-destroy" onClick={() => onDelete(id)} />
        </div>
      </li>
    );
  }
}

Task.defaultProps = {
  name: 'To do something',
  id: 1001,
  isEditing: false,
  isCompleted: false,
  status: new Date(),
  value: 'editing task',
  onClick: () => {},
  onDelete: () => {},
  onEdit: () => {},
  onChange: () => {},
  onSubmit: () => {},
};

Task.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  isEditing: PropTypes.bool,
  isCompleted: PropTypes.bool,
  status: PropTypes.instanceOf(Date),
  value: PropTypes.string,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};
