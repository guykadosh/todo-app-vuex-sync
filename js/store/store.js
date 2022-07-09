import { todoService } from '../services/todo.service.js'
import { userService } from '../services/user.service.js'
import { utilService } from '../services/util.service.js'

export const store = Vuex.createStore({
  strict: true,
  state() {
    return {
      todos: todoService.query(),
      user: userService.getLoggedinUser(),
      filterBy: {
        txt: '',
        status: '',
      },
      currTodo: null,
    }
  },
  mutations: {
    setCurrTodo(state, { todoId }) {
      state.currTodo = todoService.getById(todoId)
    },
    saveTodo(state, { todo }) {
      const newTodo = todoService.save(todo)
      const activty = { txt: '', at: Date.now() }

      const idx = state.todos.findIndex(
        currTodo => newTodo._id === currTodo._id
      )
      if (idx === -1) {
        state.todos.push(todo)
        activty.txt = 'Added a new todo'
      } else {
        state.todos.splice(idx, 1, newTodo)
        activty.txt = `Updated todo ${newTodo._id}`
      }

      userService.addActivity(activty)
      state.user.activities.push(activty)
    },
    removeTodo(state, { todoId }) {
      const activty = { txt: 'Removed a todo', at: Date.now() }

      userService.addActivity(activty)
      todoService.remove(todoId)

      state.user.activities.push(activty)
      const idx = state.todos.findIndex(todo => todo._id === todoId)
      state.todos.splice(idx, 1)
    },
    filterBy(state, { filterBy: { txt, status } }) {
      state.filterBy.txt = txt
      state.filterBy.status = status
    },
    updateUser(state, { user }) {
      const activty = { txt: 'Updated perferences', at: Date.now() }
      user.activities.push(activty)
      userService.save(user)
      state.user = user
    },
  },
  getters: {
    donePct({ todos }) {
      const dones = todos.reduce(
        (acc, todo) => (todo.isDone ? acc + 1 : acc),
        0
      )
      const total = todos.length

      return ((dones / total) * 100).toFixed(2)
    },
    todosToDisplay({ filterBy: { txt, status }, todos }) {
      let filteredTodos = todos

      const regex = new RegExp(txt, 'i')

      filteredTodos = filteredTodos.filter(todo => regex.test(todo.txt))

      if (status) {
        filteredTodos = filteredTodos.filter(
          todo =>
            (todo.isDone && status === 'done') ||
            (!todo.isDone && status === 'active')
        )
      }
      return filteredTodos
    },
  },
})
