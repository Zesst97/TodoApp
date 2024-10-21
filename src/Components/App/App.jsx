import React, { Component } from 'react';

import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';

import './App.css';

export default class App extends Component {
  state = {
    todoData: [],
    filterFlag: 'all',
    inputValue: '',
    editInputValue: '',
  };

  getTaskId = () => Math.floor(Math.random() * 1000);

  makeComplited = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const elem = todoData.find((el) => el.id === id);
      const newElem = {
        ...elem,
        isCompleted: !elem.isCompleted,
      };

      const newArray = [...todoData.slice(0, index), newElem, ...todoData.slice(index + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((elem) => elem.id === id);
      const newArray = [...todoData.slice(0, index), ...todoData.slice(index + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  addInputValue = (text) => {
    this.setState({
      inputValue: text,
    });
  };

  addNewtask = () => {
    const { inputValue } = this.state;

    if (inputValue) {
      const newTask = {
        id: this.getTaskId(),
        name: inputValue.trim(),
        status: new Date(),
        isEditing: false,
        isCompleted: false,
      };
      this.setState(({ todoData }) => {
        const newTodos = [...todoData, newTask];
        return {
          todoData: newTodos,
          inputValue: '',
        };
      });
    }
  };

  filterAll = () => {
    this.setState({
      filterFlag: 'all',
    });
  };

  filterActive = () => {
    this.setState({
      filterFlag: 'active',
    });
  };

  filterCompleted = () => {
    this.setState({
      filterFlag: 'completed',
    });
  };

  deleteAllCompletedTasks = () => {
    this.setState(({ todoData }) => {
      const activeTasks = todoData.filter((todo) => !todo.isCompleted);
      return {
        todoData: activeTasks,
      };
    });
  };

  editTask = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const elem = todoData.find((el) => el.id === id);
      const newElem = {
        ...elem,
        isEditing: !elem.isEditing,
      };

      const newArray = [...todoData.slice(0, index), newElem, ...todoData.slice(index + 1)];

      return {
        todoData: newArray,
        editInputValue: newElem.name,
      };
    });
  };

  editInputValue = (text) => {
    this.setState({
      editInputValue: text,
    });
  };

  changeTask = (id) => {
    const { editInputValue } = this.state;

    if (editInputValue.trim()) {
      this.setState(({ todoData }) => {
        const index = todoData.findIndex((el) => el.id === id);
        const elem = todoData.find((el) => el.id === id);
        const newElem = {
          ...elem,
          name: editInputValue.trim(),
          isEditing: !elem.isEditing,
        };
        const newArray = [...todoData.slice(0, index), newElem, ...todoData.slice(index + 1)];
        return {
          todoData: newArray,
          editInputValue: '',
        };
      });
    }
  };

  render() {
    const { todoData, inputValue, filterFlag, editInputValue } = this.state;

    return (
      <section className="todoapp">
        <NewTaskForm onChange={this.addInputValue} onSubmit={this.addNewtask} value={inputValue} />
        <section className="main">
          <TaskList
            todos={todoData}
            filterFlag={filterFlag}
            onActive={this.makeComplited}
            onDelete={this.deleteTask}
            onEdit={this.editTask}
            value={editInputValue}
            onChange={this.editInputValue}
            onSubmit={this.changeTask}
          />
          <Footer
            todos={todoData}
            filterFlag={filterFlag}
            onFilterAll={this.filterAll}
            onFilterActive={this.filterActive}
            onFilterCompleted={this.filterCompleted}
            onDeletedAllCompleted={this.deleteAllCompletedTasks}
          />
        </section>
      </section>
    );
  }
}
