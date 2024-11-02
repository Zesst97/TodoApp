import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Task from '../Task/Task';

import './TaskList.css';

export default class TaskList extends Component {
  render() {
    const { todos, value, filterFlag, onActive, onDelete, onEdit, onChange, onSubmit, onPause, onPlay } = this.props;
    let filteredTodos = [...todos];

    if (filterFlag === 'active') {
      filteredTodos = filteredTodos.filter((todo) => !todo.isCompleted);
    }
    if (filterFlag === 'completed') {
      filteredTodos = filteredTodos.filter((todo) => todo.isCompleted);
    }
    const todosItems = filteredTodos.map((item) => {
      const { id, name, status, isEditing, isCompleted, minutes, seconds, isTimerOn } = item;
      return (
        <Task
          id={id}
          key={id}
          name={name}
          status={status}
          isEditing={isEditing}
          isCompleted={isCompleted}
          minutes={minutes}
          seconds={seconds}
          onClick={onActive}
          onDelete={onDelete}
          onEdit={onEdit}
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          onPause={onPause}
          onPlay={onPlay}
          isTimerOn={isTimerOn}
        />
      );
    });
    return <ul className="todo-list">{todosItems}</ul>;
  }
}

TaskList.defaultProps = {
  todos: [],
  filterFlag: 'All',
  value: 'editing task',
  onActive: () => {},
  onDelete: () => {},
  onEdit: () => {},
  onChange: () => {},
  onSubmit: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      status: PropTypes.instanceOf(Date),
      isEditing: PropTypes.bool,
      isCompleted: PropTypes.bool,
    })
  ),
  filterFlag: PropTypes.string,
  value: PropTypes.string,
  onActive: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};
