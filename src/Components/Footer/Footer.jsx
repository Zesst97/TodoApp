import PropTypes from 'prop-types';
import React from 'react';

import './Footer.css';

const Footer = ({
  filterFlag = 'all',
  onFilterAll = () => {},
  onFilterActive = () => {},
  onFilterCompleted = () => {},
  onDeletedAllCompleted = () => {},
  todos = [],
}) => {
  const leftTasks = todos.filter((todo) => !todo.isCompleted).length;
  const leftString = ' items left';

  return (
    <footer className="footer">
      <span className="todo-count">
        {leftTasks}
        {leftString}
      </span>
      <ul className="filters">
        <li onClick={onFilterAll}>
          <button type="button" className={filterFlag === 'all' ? 'selected' : ''}>
            All
          </button>
        </li>
        <li onClick={onFilterActive}>
          <button type="button" className={filterFlag === 'active' ? 'selected' : ''}>
            Active
          </button>
        </li>
        <li onClick={onFilterCompleted}>
          <button type="button" className={filterFlag === 'completed' ? 'selected' : ''}>
            Completed
          </button>
        </li>
      </ul>
      <button type="button" className="clear-completed" onClick={onDeletedAllCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.instanceOf(Date),
      isEditing: PropTypes.bool,
      isCompleted: PropTypes.bool,
    })
  ),
  filterFlag: PropTypes.string,
  onFilterAll: PropTypes.func,
  onFilterActive: PropTypes.func,
  onFilterCompleted: PropTypes.func,
  onDeletedAllCompleted: PropTypes.func,
};

export default Footer;
