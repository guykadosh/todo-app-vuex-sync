import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

const KEY = 'todosDB'

export const todoService = {
  query,
  getById,
  remove,
  save,
  getEmptyTodo,
}

let gTodos = _createTodos()

function query() {
  let todos = JSON.parse(JSON.stringify(gTodos))

  return todos
}

function getById(id) {
  return gTodos.find(todo => todo._id === id)
}

function getEmptyTodo() {
  return {
    _id: '',
    txt: '',
    isDone: false,
  }
}

function remove(id) {
  const idx = gTodos.findIndex(todo => todo._id === id)
  gTodos.splice(idx, 1)
  storageService.store(KEY, gTodos)
}

function save(todo) {
  const todoToSave = JSON.parse(JSON.stringify(todo))
  const savedTodo = todoToSave._id ? _update(todoToSave) : _add(todoToSave)

  storageService.store(KEY, gTodos)
  return savedTodo
}

function _add(todo) {
  todo._id = utilService.makeId()
  gTodos.push(todo)
  return todo
}

function _update(todo) {
  const idx = gTodos.findIndex(currTodo => currTodo._id === todo._id)
  gTodos.splice(idx, 1, todo)
  return todo
}

function _createTodos() {
  let todos = storageService.load(KEY)

  if (!todos || !todos.length) {
    todos = [
      _createTodo('Recover from sprint 3'),
      _createTodo('Own Todos app once and for all'),
    ]
    storageService.store(KEY, todos)
  }
  return todos
}

function _createTodo(txt) {
  return {
    _id: utilService.makeId(),
    txt,
    isDone: false,
  }
}
