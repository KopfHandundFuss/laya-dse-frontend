<template>
  <fieldset class="ly-quiz-schoice">

    <!-- render task -->
    <legend tabindex="0">{{task}}</legend>

    <!-- render options -->
    <div class="p-3 bg-light">
      <div class="form-check" v-for="(option,i) in options">
        <label class="form-check-label">
          <input class="form-check-input"
                 type="radio"
                 v-model="answer"
                 :value="i"
                 :disabled="freeze">
          <span>{{ option }}</span>
        </label>
      </div>
    </div>

    <!-- check -->
    <div v-if="maxTries > 0" class="text-secondary my-2" tabindex="0">
      <span>Versuche übrig:</span>
      {{maxTries-tries}}
    </div>
    <button type="button"
            class="btn btn-primary"
            @click="check"
            :disabled="freeze">
      <i class="fas fa-check"></i>
      <span v-if="profile.lang === 'de'">Prüfen</span>
      <span v-else>Check</span>
    </button>
    <span :id="feedbackId" class="ml-2" aria-live="polite">{{ feedback }}</span>

  </fieldset>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'ly-quiz-schoice',
  created () {
  },
  data () {
    return {
      tries: 0,
      answer: -1,
      feedback: '',
      freeze: false
    }
  },
  props: {
    task: String,
    options: Array,
    solution: Number,
    maxTries: Number
  },
  computed: {
    ...mapState(['profile']),
    ...mapGetters(['isAuthor']),
    feedbackId: function () {
      return `schoice-feedback-${this._uid}`
    }
  },
  methods: {
    check: function () {
      if (this.freeze) return

      this.tries++
      let correct = this.answer === this.solution
      if (correct) {
        this.feedback = "Richtig!"
        this.freeze = true
        document.getElementById(this.feedbackId).focus()
        return
      } else {
        this.feedback = "Leider falsch!"
        if (this.tries >= this.maxTries) {
          this.freeze = true
          this.answer = this.solution
          this.feedback = "Die Lösung wird angezeigt"
        }
        document.getElementById(this.feedbackId).focus()
      }
    }
  }
}
</script>

<style scoped>
.author {
  padding: 0.5rem;
  border: 2px solid lightskyblue;
}
  
*:focus {
  outline: 2px dashed deepskyblue;
  outline-offset: 5px;
}
</style>
