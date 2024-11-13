import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import './Task.css';

const Task = ({
  name = 'To do something',
  id = 1001,
  isEditing = false,
  isCompleted = false,
  status = new Date(),
  value = 'editing task',
  onClick = () => {},
  onDelete = () => {},
  onEdit = () => {},
  onChange = () => {},
  onSubmit = () => {},
  onPlay = () => {},
  onPause = () => {},
  minutes,
  seconds,
}) => {
  const [isOn, setIsOn] = useState(false);

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(id);
  };

  const handlePlay = () => {
    setIsOn(true);
    onPlay(id);
  };

  const handlePause = () => {
    setIsOn(false);
    onPause(id);
  };

  const handleCompletedClick = () => {
    setIsOn(false);
    onClick(id);
  };

  if (isEditing) {
    return (
      <li className="editing">
        <div className="view" />
        <form onSubmit={handleSubmit}>
          <input type="text" className="edit" value={value} onChange={handleChange} />
        </form>
      </li>
    );
  }

  return (
    <li className={isCompleted ? 'completed' : ''}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={isCompleted} onClick={handleCompletedClick} onChange={(e) => e.target.checked} />
        <label>
          <span className="title" onClick={() => onClick(id)}>
            {name}
          </span>
          <span className="description timer">
            <button type="button" className="icon icon-play" onClick={handlePlay} disabled={isCompleted || isOn} />
            <button type="button" className="icon icon-pause" onClick={handlePause} disabled={isCompleted} />
            {Number(minutes) !== 0 || Number(seconds) !== 0 ? `    ${minutes}:${seconds}` : '    Time is over!'}
          </span>
          <span className="description">
            {`created ${formatDistanceToNow(status.toString(), {
              includeSeconds: true,
              addSuffix: true,
            })}`}
          </span>
        </label>
        <button aria-label="edit form" type="button" className="icon icon-edit" onClick={() => onEdit(id)} disabled={isCompleted} />
        <button aria-label="delete form" type="button" className="icon icon-destroy" onClick={() => onDelete(id)} />
      </div>
    </li>
  );
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
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  minutes: PropTypes.string,
  seconds: PropTypes.string,
};

export default Task;
