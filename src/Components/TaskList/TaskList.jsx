import PropTypes from 'prop-types';
import React from 'react';

import Task from '../Task/Task';
import './TaskList.css';

const TaskList = ({
  todos = [],
  value = 'editing task',
  filterFlag = 'All',
  onActive = () => {},
  onDelete = () => {},
  onEdit = () => {},
  onChange = () => {},
  onSubmit = () => {},
  onPause = () => {},
  onPlay = () => {},
}) => {
  const getFilteredTodos = () => {
    if (filterFlag === 'active') return todos.filter((todo) => !todo.isCompleted);
    if (filterFlag === 'completed') return todos.filter((todo) => todo.isCompleted);
    return todos;
  };

  const filteredTodos = getFilteredTodos();

  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => {
        const { id, name, status, isEditing, isCompleted, minutes, seconds, isTimerOn } = item;
        return (
          <Task
            key={id}
            id={id}
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
      })}
    </ul>
  );
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      status: PropTypes.instanceOf(Date),
      isEditing: PropTypes.bool,
      isCompleted: PropTypes.bool,
      minutes: PropTypes.string,
      seconds: PropTypes.string,
      isTimerOn: PropTypes.bool,
    })
  ),
  filterFlag: PropTypes.string,
  value: PropTypes.string,
  onActive: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
};

export default TaskList;
