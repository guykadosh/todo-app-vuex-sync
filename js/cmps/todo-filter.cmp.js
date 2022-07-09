export default {
  template: `
    <section class="todo-filter flex space-between">
        <input class="input" 
                v-model="txtInput"
                @input="setFilter('')" 
                type="text"
                placeholder="filter..">
        <div class="filter-btns flex align-center">
          <a @click="setFilter('')">All</a>
          <a @click="setFilter('active')">Active</a>
          <a @click="setFilter('done')">Done</a>
        </div>
    </section>
`,
  data() {
    return {
      filterBy: {
        txt: '',
        status: '',
      },
      txtInput: '',
    }
  },
  created() {},
  methods: {
    setFilter(status) {
      this.filterBy.status = status
      this.filterBy.txt = this.txtInput
      this.$emit('filtered', this.filterBy)
    },
  },
  computed: {},
  unmounted() {},
}
