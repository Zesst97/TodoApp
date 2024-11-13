import PropTypes from 'prop-types';
import React from 'react';

import './NewTaskForm.css';

const NewTaskForm = ({
  value = 'New task is here',
  minValue = '',
  secValue = '',
  onChange = () => {},
  onMinutesChange = () => {},
  onSecondsChange = () => {},
  onSubmit = () => {},
}) => {
  const handleChangeTask = (event) => {
    onChange(event.target.value);
  };

  const handleChangeMin = (event) => {
    onMinutesChange(event.target.value);
  };

  const handleChangeSec = (event) => {
    const seconds = event.target.value;
    onSecondsChange(seconds <= 59 ? seconds : '59');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit} className="new-todo-form">
        <input className="new-todo" placeholder="What needs to be done?" value={value} onChange={handleChangeTask} />
        <input type="number" className="new-todo-form__timer" placeholder="Min" maxLength={3} onChange={handleChangeMin} value={minValue} />
        <input
          className="new-todo-form__timer"
          type="number"
          min="0"
          max="59"
          placeholder="Sec"
          onChange={handleChangeSec}
          value={secValue}
        />
        <button type="submit" />
      </form>
    </header>
  );
};

NewTaskForm.propTypes = {
  value: PropTypes.string,
  minValue: PropTypes.string,
  secValue: PropTypes.string,
  onChange: PropTypes.func,
  onMinutesChange: PropTypes.func,
  onSecondsChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default NewTaskForm;
