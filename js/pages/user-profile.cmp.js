export default {
  template: `
    <section class="user-profile flex flex-column">
      <form @submit.prevent="applyChanges">
        <label for="">Enter new name</label>
        <input 
          class="input" 
          type="text"
          v-model="user.fullName">
        <label for="">Background</label>
        <input v-model="user.prefs.color" type="color">
        <label for="">Text</label>
        <input v-model="user.prefs.bgColor" type="color">
        <button>Apply</button>
      </form>
      <ul class="activities clean-list">
          <li v-for="activity in user.activities">
             <p>{{ activity.txt }}</p>
             <p>At: {{ activity.at }}</p>
          </li>
      </ul>
      <router-link to="/todo">Back</router-link>
    </section>
`,
  data() {
    return {
      user: null,
    }
  },
  created() {
    this.user = this.clone
  },
  methods: {
    applyChanges() {
      this.$store.commit({ type: 'updateUser', user: this.user })
    },
  },
  computed: {
    clone() {
      return JSON.parse(JSON.stringify(this.$store.state.user))
    },
  },
  unmounted() {},
}
