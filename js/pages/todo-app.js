import todoList from '../cmps/todo-list.cmp.js'
import todoFilter from '../cmps/todo-filter.cmp.js'

export default {
  template: `
      <section class="todo-app">
          <todo-filter @filtered="setFilterBy" />
          <todo-list :todos="todos"
                     @removed="removeTodo"
                     @toggled="toggleTodo" />
          <router-view />
      </section>
  `,
  components: {
    todoList,
    todoFilter,
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    removeTodo(todoId) {
      this.$store.commit({ type: 'removeTodo', todoId })
    },
    setFilterBy(filterBy) {
      filterBy = JSON.parse(JSON.stringify(filterBy))
      this.$store.commit({ type: 'filterBy', filterBy })
    },
    toggleTodo(todo) {
      const newTodo = JSON.parse(JSON.stringify(todo))
      newTodo.isDone = !newTodo.isDone
      this.$store.commit({ type: 'saveTodo', todo: newTodo })
    },
  },
  computed: {
    todos() {
      return this.$store.getters.todosToDisplay
    },
  },
  unmounted() {},
}
