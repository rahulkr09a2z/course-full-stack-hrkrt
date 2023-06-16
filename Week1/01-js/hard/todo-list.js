/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
  - `npm run test-todo-list`
*/

class Todo {
  constructor() {
    this.todoList = [];
  }

  add(task) {
    this.todoList.push(task);
  }

  remove(todoIndex) {
    if (todoIndex < 0) return;
    this.todoList.splice(todoIndex, 1);
  }

  update(todoIndex, updatedTodo) {
    if (this.todoList[todoIndex]) this.todoList[todoIndex] = updatedTodo;
  }
  getAll() {
    return this.todoList;
  }
  get(todoIndex) {
    if (todoIndex < 0) return;
    if (this.todoList[todoIndex]) return this.todoList[todoIndex];
    return null;
  }
  clear() {
    this.todoList = [];
  }
}

module.exports = Todo;
