<template>
  <div class="ly-quiz-choice">
    <schoice v-if="type === 'single'"
             :task="task"
             :options="options"
             :solution="solutions[0]"
             :maxTries="maxTries">
    </schoice>
    <mchoice v-else
             :task="task"
             :options="options"
             :solutions="solutions"
             :maxTries="maxTries">
    </mchoice>
  </div>
</template>

<script>
import http from 'axios'
import {mapState, mapGetters} from 'vuex'

import schoice from "./quiz-schoice.vue"
import mchoice from "./quiz-mchoice.vue"

export default {
  name: 'ly-quiz-choice',
  created () {
  },
  activated () {
    if (!this.loaded) {
      this.onUrlChange()
    }
  },
  data () {
    return {
      type: "single",
      task: "",
      options: [],
      solutions: [],
      maxTries: 0,
      loaded: false
    }
  },
  props: {
    url: String
  },
  watch: {
    url: function () {
      this.onUrlChange()
    }
  },
  computed: {
  },
  methods: {
    onUrlChange: function () {
      const ctx = this
      console.log("quiz url", ctx.url)

      if (ctx.url !== null && ctx.url !== "") {
        http.get(ctx.url)
          .then(({data}) => {
            ctx.type = data.type
            ctx.task = data.task
            ctx.options = data.options
            ctx.solutions = data.solutions
            ctx.maxTries = data.maxTries
            ctx.loaded = true
          })
      }
    }
  },
  components: {
    schoice,
    mchoice
  }
}
</script>

<style scoped>
</style>
