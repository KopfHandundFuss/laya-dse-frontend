<template>
  <div v-if="!note.busy">

    <!-- course header -->
    <div class="nav-padding bg-dark">
      <h1 class="text-center text-light">
        <b>{{ course.name }}</b>
      </h1>
      <h6 class="text-center text-light">
        <u>{{ course.category }}</u>
        <span>/</span>
        <span>{{ course.author.username }}</span>
      </h6>
    </div>
    <div class="container">
      <div class="row">
        <div class="col">

          <div style="height: 1rem"></div>

          <h5 role="navigation">
            <a :href="'#'+backUrl" class="text-dark" tabindex="0">
              <u>
                <i class="fas fa-angle-left"></i> zurück zu
                {{ /my/.test(backUrl) ? 'meinen Kursen' : 'allen Kursen' }}
              </u>
            </a>
          </h5>

          <div style="height: 1rem"></div>
          <div class="course-meta d-flex justify-content-between pt-2">
            <div>
              <span v-if="course.locked" class="mr-2">
                <i class="fas fa-lock fa-lg"></i>
              </span>
              <span v-if="course.endDate">
                <i class="fas fa-stopwatch fa-lg"></i>
              </span>
              <div class="mt-3" v-if="course.endDate">
                {{ shortDate(course.startDate) }} &mdash;<br>
                {{ shortDate(course.endDate) }}
              </div>
            </div>
            <div class="text-right">
              <span>{{ locDate(course.createDate) }}</span>
              <a href v-if="userEnrolled" @click.prevent="unsubscribe"
                class="d-block mt-2 text-dark">
                <i class="fas fa-exclamation-circle"></i>
                <u>Abmelden</u>
              </a>
            </div>
          </div>

          <div style="height: 3rem"></div>
          <div>{{ course.abstract }}</div>

          <div style="height: 3rem"></div>
          <button v-if="!userEnrolled" type="button" @click="subscribe"
            class="btn btn-lg btn-block btn-outline-dark subscribe-btn">
            Für diesen Kurs anmelden <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- course content -->
    <div class="ly-bg-grey" v-show="userEnrolled || isAuthor">
      <div class="container">
        <div class="row">
          <div class="col py-5">

            <div v-show="empty(contents)" class="py-4">
              <h3 class="empty text-center text-muted m-0">
                <i class="far fa-meh"></i>
                <span>Dieser Kurs ist noch leer</span>
              </h3>
            </div>

            <div v-for="(content, cat) in contents"
              v-show="!empty(content)" class="catHeader" role="tablist">
              <h4 class="d-flex justify-content-between align-item-center
                my-3" v-b-toggle="cat" :key="cat" tabindex="0"
                @keyup.enter="toggle(cat)">
                <div style="width: 10%">
                  <i class="fas fa-check d-none"></i>
                </div>
                <u class="click" style="flex: 2"><b>{{ cat }}</b></u>
                <div class="w-25 text-right click">
                  <i v-show="!vstate[cat]" class="fas fa-plus"></i>
                  <i v-show="vstate[cat]" class="fas fa-minus"></i>
                </div>
              </h4>

              <!-- course content types -->
              <b-collapse :id="cat" :key="cat+'-C'"
                v-model="vstate[cat]" role="tabpanel">

                <!-- course topics -->
                <div v-for="(topic,i) in content.topics"
                  :key="cat+topic.name+i">
                  <div class="d-flex flex-wrap align-items-center pb-2">

                    <!-- left meta infos -->
                    <div style="width: 10%">
                      <i class="fas fa-circle fa-xs"></i>
                      <i class="fas fa-circle fa-xs"></i>
                    </div>

                    <!-- content link
                    <div style="flex: 2" class="click"
                      v-b-toggle="cat+'_topic_'+i" :tabindex="i+1">
                      <h6 class="pl-1 m-0" style="flex: 2">
                        <u class="text-dark"><b>{{topic.name}}</b></u>
                      </h6>
                    </div>
                    -->
                    <button type="button" class="topic-button"
                      v-b-toggle="cat+'_topic_'+i">
                      <u>{{ topic.name }}</u>
                    </button>

                    <!-- right meta infos -->
                    <div class="w-25 d-inline-flex
                      flex-column justify-content-between align-items-end">
                      <button v-if="isAuthor" style="font-size: 0.75em"
                        class="btn btn-sm btn-danger ly-del-btn"
                        @click="delContent(topic.id, i, cat, 'topics')"
                        tabindex="-1">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>Löschen</span>
                      </button>
                    </div>

                    <!-- content -->
                    <b-collapse :id="cat+'_topic_'+i" :key="cat+'_topic_'+i"
                      class="topic-content mt-2" role="tabpanel">
                      <!-- <ly-course-topic :topic="topic"></ly-course-topic> -->
                    </b-collapse>

                  </div>
                </div>

                <!-- course quizzes -->
                <div v-for="(quiz,i) in content.quizzes"
                  :key="cat+quiz.name+i">
                  <div class="d-flex flex-wrap align-items-center pb-2">

                    <!-- left meta infos -->
                    <div style="width: 10%">
                      <i class="fas fa-pencil-alt"></i>
                    </div>

                    <!-- content link -->
                    <button type="button" class="topic-button"
                      v-b-toggle="cat+'_quiz'+i">
                      <u>{{ quiz.name }}</u>
                    </button>

                    <!-- right meta infos -->
                    <div class="w-25 d-inline-flex
                      flex-column justify-content-between align-items-end">
                      <button v-if="isAuthor" style="font-size: 0.75em"
                        class="btn btn-sm btn-danger ly-del-btn"
                        @click="delContent(quiz.id, i, cat, 'quizzes')"
                        tabindex="-1">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>Löschen</span>
                      </button>
                    </div>

                    <!-- content -->
                    <b-collapse :id="cat+'_quiz'+i" :key="cat+'_quiz'+i"
                      class="topic-content mt-2" role="tabpanel">
                      <!-- <ly-course-quiz :quiz="quiz"></ly-course-quiz> -->
                    </b-collapse>

                  </div>
                </div>
              </b-collapse>
            </div>

          </div> <!-- col -->
        </div> <!-- row -->
      </div> <!-- container -->
    </div>

    <div class="container">
      <div class="row">
        <div class="col">

          <!-- author: create new content -->
          <div style="height: 3rem"></div>
          <div v-if="isAuthor">
            <div class="card">
              <div class="card-header text-white bg-primary">
                <i class="fas fa-plus"></i> Neuer Inhalt
              </div>
              <div class="card-body">
                <form>
                  <div class="form-row">
                    <div class="col">
                      <div class="form-group">
                        <input type="text" class="form-control"
                        placeholder="Name" v-model="newContent.name">
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group">
                        <input type="text" class="form-control"
                        placeholder="Kategorie" v-model="newContent.category">
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col">
                      <div class="form-group">
                        <select class="form-control custom-select"
                          v-model="newContent.type">
                          <option value="" disabled>Typ wählen ...</option>
                          <option value="topics">Lerninhalt</option>
                          <option value="quizzes">Übung</option>
                          <!-- <option value="test">Test</option> -->
                        </select>
                      </div>
                    </div>
                    <div class="col">
                      <button @click="storeNewContent"
                        type="submit" class="btn btn-block btn-primary">
                        <i class="fas fa-check"></i> Speichern
                      </button>
                    </div>
                  </div>
                  <b class="d-block text-center w-100">{{authorMsg}}</b>
                </form>
              </div>
            </div>

          </div>
        </div> <!-- col -->
      </div> <!-- row -->
    </div> <!-- container -->
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

import lyBtn from '@comps/btn'
import lyAccordion from '@comps/accordion'

import bCollapse from 'bootstrap-vue/es/components/collapse/collapse'
import vBToggle from 'bootstrap-vue/es/directives/toggle/toggle'

import http from 'axios'
import * as i18n from '../i18n/login'
import utils from '../misc/utils.js'

export default {
  name: 'course-detail-view',
  data () {
    return {
      course: {},
      contents: {},
      userEnrolled: false,
      backUrl: '',

      newContent: { type: '' },
      vstate: {}, /* header collapse state */
      authorMsg: ''
    }
  },
  computed: {
    ...mapState(['auth', 'note']),
    ...mapGetters(['isAuthor']),

    msg: function () {
      return i18n[this.$store.state.profile.lang]
    }
  },
  methods: {
    ...utils,

    empty: function (obj) {
      if (Array.isArray(obj)) return obj.length === 0
      return Object.keys(obj).length === 0
    },
    emptyContent: function (obj) {
      // TODO
    },
    /*
     * collapse cat headers */
    show: function (cat, bool) {
      this.vstate[cat] = bool
      this.$forceUpdate()
    },
    toggle: function (cat) {
      this.vstate[cat] = !this.vstate[cat]
      this.$forceUpdate()
    },

    /*
     * course enrollment/subscription */
    subscribe: function () {
      const ctx = this
      http.put(`accounts/${ctx.auth.userId}/mycourses/rel/${ctx.course.name}`)
        .then(({data}) => {
          ctx.$store.commit('addMyCourse')
          ctx.userEnrolled = true
        })
        .catch(err => console.error(err))
    },
    unsubscribe: function () {
      const ctx = this
      ctx.$store.commit('setBusy', true)
      http.delete(`accounts/${ctx.auth.userId}/mycourses/rel/${ctx.course.name}`)
        .then(({data}) => {
          ctx.userEnrolled = false
        })
        .catch(err => console.error(err))
        .then(() => {
          ctx.$store.commit('setBusy', false)
        })
    },

    /*
     * author controls */
    storeNewContent: function () {
      const ctx = this
      const id = this.course.name
      const {name, category, type} = this.newContent
      if (!name || !category || !type) {
        this.authorMsg = 'Kontrolliere Deine Eingaben!'
        return
      }
      this.authorMsg = ''
      http.post(`courses/${id}/${type}`, { name, category })
        .then(({data}) => {
          utils.categorize([data], ctx.contents, type)
          ctx.$forceUpdate()
        })
        .catch(err => console.error(err))
    },
    delContent: function (id, pos, cat, type) {
      const ctx = this
      http.delete(`courses/${ctx.course.name}/${type}/${id}`)
        .then(() => {
          ctx.contents[cat][type].splice(pos, 1)
          ctx.$forceUpdate()
        })
        .catch(err => console.error(err))
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => { vm.backUrl = from.path })
  },
  created () {
    const ctx = this
    window.scrollTo(0, 0)
    ctx.$store.commit('setBusy', true)
    /*
     * fetch course */
    http.get(`courses/${ctx.$route.params.id}` +
      '/?filter={"include":["author", {"topics": "contents"}, {"quizzes": "contents"}]}')
      .then(function ({data}) {
        ctx.course = data
        /*
         * categorize content */
        let contents = {}
        utils.categorize(data.topics, contents, 'topics')
        utils.categorize(data.quizzes, contents, 'quizzes')
        ctx.contents = {...contents}
        /*
         * is student enrolled */
        http.head(`courses/${data.name}/students/rel/${ctx.auth.userId}`)
          .then(() => {
            ctx.userEnrolled = true
          })
      })
      .catch(err => {
        /*
         * redirect off invalid course */
        console.error(err)
        this.$router.push('/courses')
      })
      .then(() => ctx.$store.commit('setBusy', false))
  },
  components: {
    lyBtn,
    lyAccordion,
    bCollapse,
    vBToggle
  }
}
</script>

<style scoped>
*:focus {
  outline: 2px dashed deepskyblue;
}

.subscribe-btn {
  border: 2px solid black;
}

.nav-padding {
  padding-top: 8rem;
  padding-bottom: 2rem;
}

.course-meta {
  border-top: 1px solid black;
}
.catHeader {
  border-top: 2px solid black;
}
.catHeader:last-child {
  border-bottom: 2px solid black;
}
.click {
  cursor: pointer;
}

.content-icon {
  font-size: 6rem;
  line-height: 0rem;
  padding-bottom: 1rem;
  margin-top: -1rem;
}

.topic-content {
  width: 100%;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  background-color: #fbfcf7;
}

.topic-button {
  flex: 2;

  color: black;
  border: none;
  text-align: start;
  background-color: transparent;
}
.topic-button:focus {
  outline: 2px dashed deepskyblue;
}
</style>
