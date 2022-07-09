import { showSuccessMsg } from '../services/event-bus.service.js'
import { todoService } from '../services/todo.service.js'
import { userService } from '../services/user.service.js'

export default {
  template: `
    <section v-if="todo" class="todo-edit flex justify-center align-center">
      <form @submit.prevent="saveTodo"
            class="flex space-between align-center">
        <input v-model="todo.isDone" type="checkbox">
        <input class="input" v-model="todo.txt" type="text">
        <!-- <label class="cl-checkbox">
            <input type="checkbox"  v-model="todo.isDone">
            <span></span>
        </label> -->
        <button class="btn">Save</button>
      </form>
    </section>
`,
  data() {
    return {
      todo: null,
    }
  },
  watch: {
    '$route.params': {
      handler() {
        const { todoId } = this.$route.params
        if (todoId) {
          this.$store.commit({ type: 'setCurrTodo', todoId })
          this.todo = this.todoClone
        } else {
          this.todo = todoService.getEmptyTodo()
        }
      },
      immediate: true,
    },
  },
  created() {},
  methods: {
    saveTodo() {
      this.$store.commit({ type: 'saveTodo', todo: this.todo })
      this.$router.push('/todo')
      showSuccessMsg('Added/Updated succssefully')
    },
  },
  computed: {
    todoClone() {
      return JSON.parse(JSON.stringify(this.$store.state.currTodo))
    },
  },
  unmounted() {},
}
