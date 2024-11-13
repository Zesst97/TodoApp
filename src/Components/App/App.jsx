import React, { useState } from 'react';

import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';

import './App.css';

const App = () => {
  const [todoData, setTodoData] = useState([]);
  const [filterFlag, setFilterFlag] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const [inputMin, setInputMin] = useState('');
  const [inputSec, setInputSec] = useState('');
  const [editInputValue, setEditInputValue] = useState('');

  const getTaskId = () => Math.floor(Math.random() * 1000);

  const makeCompleted = (id) => {
    setTodoData((prevData) =>
      prevData.map((task) =>
        task.id === id
          ? {
              ...task,
              isCompleted: !task.isCompleted,
              isTimerOn: false,
              isTimerFinished: task.isCompleted ? task.isTimerFinished : false,
              timerId: task.isCompleted || task.isTimerOn ? clearInterval(task.timerId) : task.timerId,
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTodoData((prevData) => {
      const task = prevData.find((todo) => todo.id === id);
      if (task) clearInterval(task.timerId);
      return prevData.filter((todo) => todo.id !== id);
    });
  };

  const addInputValue = (text) => setInputValue(text);
  const addMinutesValue = (text) => setInputMin(text < 10 ? `0${Number(text)}` : `${Number(text)}`);
  const addSecondsValue = (text) => setInputSec(text < 10 ? `0${Number(text)}` : `${Number(text)}`);

  const addNewTask = () => {
    if (inputValue && inputMin && inputSec) {
      const newTask = {
        id: getTaskId(),
        name: inputValue.trim(),
        status: new Date(),
        isEditing: false,
        isCompleted: false,
        isTimerFinished: false,
        minutes: inputMin,
        seconds: inputSec,
        timerId: null,
        isTimerOn: false,
      };
      setTodoData((prevData) => [...prevData, newTask]);
      setInputMin('');
      setInputSec('');
      setInputValue('');
    }
  };

  const filterAll = () => setFilterFlag('all');
  const filterActive = () => setFilterFlag('active');
  const filterCompleted = () => setFilterFlag('completed');

  const deleteAllCompletedTasks = () => {
    setTodoData((prevData) => prevData.filter((todo) => !todo.isCompleted));
  };

  const editTask = (id) => {
    setTodoData((prevData) => prevData.map((task) => (task.id === id ? { ...task, isEditing: !task.isEditing } : task)));
    const task = todoData.find((task) => task.id === id);
    if (task) setEditInputValue(task.name);
  };

  const changeTask = (id) => {
    if (editInputValue.trim()) {
      setTodoData((prevData) =>
        prevData.map((task) => (task.id === id ? { ...task, name: editInputValue.trim(), isEditing: false } : task))
      );
      setEditInputValue('');
    }
  };

  const pauseTimer = (id) => {
    setTodoData((prevData) =>
      prevData.map((task) => (task.id === id ? { ...task, timerId: clearInterval(task.timerId), isTimerOn: false } : task))
    );
  };

  const formatMinutes = (minutes, seconds) => {
    if (Number(minutes) < 10) return `0${Number(minutes) - (Number(seconds) === 0 ? 1 : 0)}`;
    return `${Number(minutes) - (Number(seconds) === 0 ? 1 : 0)}`;
  };

  const formatSeconds = (seconds) => (Number(seconds) === 0 ? '59' : `0${Number(seconds) - 1}`.slice(-2));

  const startTimer = (id) => {
    setTodoData((prevData) =>
      prevData.map((task) =>
        task.id === id && !task.isTimerOn && !task.isTimerFinished
          ? {
              ...task,
              timerId: setInterval(() => {
                setTodoData((prevData) =>
                  prevData.map((task) => {
                    if (task.id === id) {
                      const minutes = formatMinutes(task.minutes, task.seconds);
                      const seconds = formatSeconds(task.seconds);
                      if (minutes === '00' && seconds === '00') {
                        clearInterval(task.timerId);
                        return {
                          ...task,
                          minutes: '00',
                          seconds: '00',
                          isTimerOn: false,
                          isTimerFinished: true,
                        };
                      }
                      return {
                        ...task,
                        minutes,
                        seconds,
                        isTimerOn: true,
                      };
                    }
                    return task;
                  })
                );
              }, 1000),
              isTimerOn: true,
            }
          : task
      )
    );
  };

  return (
    <section className="todoapp">
      <NewTaskForm
        onChange={addInputValue}
        onMinutesChange={addMinutesValue}
        onSecondsChange={addSecondsValue}
        onSubmit={addNewTask}
        minValue={inputMin}
        secValue={inputSec}
        value={inputValue}
      />
      <section className="main">
        <TaskList
          todos={todoData}
          filterFlag={filterFlag}
          onActive={makeCompleted}
          onDelete={deleteTask}
          onEdit={editTask}
          value={editInputValue}
          onChange={setEditInputValue}
          onSubmit={changeTask}
          onPause={pauseTimer}
          onPlay={startTimer}
        />
        <Footer
          todos={todoData}
          filterFlag={filterFlag}
          onFilterAll={filterAll}
          onFilterActive={filterActive}
          onFilterCompleted={filterCompleted}
          onDeletedAllCompleted={deleteAllCompletedTasks}
        />
      </section>
    </section>
  );
};

export default App;
