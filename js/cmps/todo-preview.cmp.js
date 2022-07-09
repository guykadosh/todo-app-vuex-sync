export default {
  props: ['todo'],
  template: `
      <section class="todo-preview flex space-between">
          <p @click="$emit('toggled')"
              :class="done">{{ todo.txt }}</p>
          <div>
            <button @click="$emit('removed')">x</button>
            <router-link 
            :to="'/todo/edit/' + todo._id">
                  Edit</router-link>
            <router-link 
            :to="'/todo/details/' + todo._id">
                  Details</router-link>
          </div>
      </section>
    `,
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {
    done() {
      return { done: this.todo.isDone }
    },
  },
  unmounted() {},
}
