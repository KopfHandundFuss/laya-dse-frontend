<template>
  <div class="nav-margin">
    <div class="container">

      <div class="row">
        <img class="mx-auto" src="../assets/kurse.svg" alt="Gerhirn">
      </div>

      <div style="height: 2rem"></div>

      <div class="row">
        <div class="col">
          <h1 class="text-center">
            <strong>{{ i18n.title }}</strong>
          </h1>
        </div>
      </div>

      <div style="height: 2rem"></div>

      <div class="row">
        <div class="col">
          <div class="ly-search-bar">
            <input id="search-bar"
                   type="text"
                   v-model="searchInput"
                   :placeholder="i18n.searchPH">
            <i class="fas fa-search"></i>
          </div>
        </div>
      </div>

      <div style="height: 2rem"></div>
    </div>

    <div class="ly-bg-grey">
      <div class="container">
        <div class="row">
          <div class="col">

            <div v-show="noCourses() && !note.busy" class="py-4">
              <h3 class="empty text-center text-muted m-0">
                <i class="far fa-frown"></i>
                <span>{{ i18n.noCourses }}</span>
              </h3>
            </div>

            <div v-for="(courses, cat) in cats"
                 v-show="search(courses).length > 0 && !note.busy">
              <div class="d-flex justify-content-between align-item-center catHeader"
                   v-b-toggle="cat"
                   :key="cat"
                   tabindex="0"
                   @keyup.enter="toggle(cat)">
                <u>{{ cat }}</u>
                <span>{{ countMsg(courses) }}</span>
              </div>

              <!-- courses -->
              <b-collapse :id="cat" :key="cat+'-C'" v-model="vstate[cat]">
                <ly-accordion :data="search(courses)">
                  <div slot="item" slot-scope="data">
                    <div class="d-flex">

                      <!-- left meta infos -->
                      <div class="w-25 pr-5 pl-1">
                        <h4>
                          <i v-show="data.item.locked" class="fas fa-lock"></i>
                          <i v-show="data.item.endDate" class="fas fa-stopwatch"></i>
                        </h4>
                        <span v-show="data.item.endDate">
                          {{ shortDate(data.item.startDate) }} &mdash;
                          {{ shortDate(data.item.endDate) }}
                        </span>
                      </div>

                      <!-- course link 
                        <a :href="'#/courses/'+data.item.name"
                        class="w-50 pl-xs-1 pl-md-0"> -->
                        <a :href="'#/dse'"
                          class="w-50 pl-xs-1 pl-md-0">
                          <h4>
                            <u><b>{{ data.item.name }}</b></u>
                          </h4>
                          <span>{{ data.item.category }}</span>
                          <span>&mdash;</span><br>
                          <span>{{ data.item.author.username }}</span>
                        </a>

                        <!-- right meta infos -->
                        <div class="w-25 d-inline-flex flex-column
                        justify-content-between align-items-end">
                          <div class="text-right">
                            {{ shortDate(data.item.createDate) }}
                          </div>
                          <button v-if="isAuthor"
                                  class="btn btn-sm btn-danger ly-del-btn"
                                  @click="delCourse(data.item.name)">
                            <i class="fas fa-exclamation-triangle"></i>
                            <span>Löschen</span>
                          </button>
                        </div>

                    </div>
                  </div>
                </ly-accordion>
              </b-collapse>
            </div>

          </div> <!-- col -->
        </div> <!-- row -->
      </div> <!-- container -->
    </div>

    <div style="height: 2rem"></div>

    <!-- author view -->
    <div class="container" v-if="isAuthor">
      <div class="row">
        <div class="col">

          <!-- create new course -->
          <div class="card">
            <div class="card-header text-white bg-primary">
              <i class="fas fa-plus"></i> Neuer Kurs
            </div>
            <div class="card-body">
              <form>
                <div class="form-row mb-2">
                  <div class="col">
                    <input type="text" class="form-control"
                                       placeholder="Name" v-model="newCourse.name">
                  </div>
                  <div class="col">
                    <input type="text" class="form-control"
                                       placeholder="Kategorie" v-model="newCourse.category">
                  </div>
                </div>
                <div class="form-row mb-2">
                  <div class="col">
                    <textarea class="form-control"
                              placeholder="Abstrakt" v-model="newCourse.abstract">
                    </textarea>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col">
                    <label>Startdatum</label>
                    <input type="date" class="form-control"
                                       v-model="newCourse.startDate">
                  </div>
                  <div class="form-group col">
                    <label>Enddatum</label>
                    <input type="date" class="form-control"
                                       v-model="newCourse.endDate">
                  </div>
                </div>
                <div class="form-row">
                  <div class="col">
                    <div class="form-check">
                      <label class="form-check-label">
                        <input type="checkbox" class="form-check-input"
                                               placeholder="Kategorie" v-model="newCourse.locked">
                        Kurs sperren
                      </label>
                    </div>
                  </div>
                  <div class="col">
                    <button @click="storeNewCourse"
                      type="submit" class="btn btn-block btn-primary">
                      <i class="fas fa-check"></i> Speichern
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

import bCollapse from 'bootstrap-vue/es/components/collapse/collapse'
import vBToggle from 'bootstrap-vue/es/directives/toggle/toggle'
import lyAccordion from '@comps/accordion'

import http from 'axios'
import * as i18n from '@i18n/courses'
import utils from '../misc/utils.js'

export default {
  name: 'courses-view',
  data () {
    return {
      cats: {},
      newCourse: {},
      searchInput: '',
      vstate: {}
    }
  },
  computed: {
    ...mapState(['note', 'auth']),
    ...mapGetters(['isAuthor']),

    i18n: function () {
      return i18n[this.$store.state.profile.lang]
    }
  },
  methods: {
    ...utils,

    toggle: function (cat) {
      this.vstate[cat] = !this.vstate[cat]
    },
    search: function (courses) {
      let input = this.searchInput
      if (input === '') return courses
      let matches = courses.filter(course => {
        let re = new RegExp(input, 'i')
        return re.test(course.name)
      })
      return matches
    },
    countMsg: function (courses) {
      const count = courses.length
      return `${count} ${count > 1 ? 'Kurse' : 'Kurs'}`
    },
    noCourses: function () {
      return Object.keys(this.cats).length === 0
    },

    storeNewCourse: function () {
      const {$store, newCourse, auth, fetchCourses} = this
      $store.commit('setBusy', true)
      /*
       * create course */
      http.post('courses', {
        ...newCourse,
        authorId: auth.userId
      }).then(({data}) => {
        fetchCourses()
      }).catch(err => {
        console.log(err)
      }).then(() => $store.commit('setBusy', false))
      /*
       * create storage */
      http.post('storage', {
        name: newCourse.name
      }).then(() => console.log(`New Storage: ${newCourse.name}`))
        .catch((err) => console.error(err))
    },

    delCourse: function (name) {
      const {$store, fetchCourses} = this
      $store.commit('setBusy', true)
      http.delete(`courses/${name}`)
        .then(fetchCourses)
        .catch(err => console.error(err))
        .then(() => {
          $store.commit('setBusy', false)
        })
    },

    fetchCourses: function () {
      let ctx = this
      ctx.$store.commit('setBusy', true)
      http.get('courses?filter[include]=author')
        .then(function ({data}) {
          /*
           * categorize courses */
          let cats = {}
          data.forEach(course => {
            let cat = cats[course.category]
            if (!cat) {
              cats[course.category] = []
            }
            cats[course.category].push(course)
          })
          ctx.cats = { ...cats }
        })
        .catch(err => console.error(err))
        .then(() => ctx.$store.commit('setBusy', false))
    }
  },
  mounted () {
    document.querySelector('#search-bar').focus()
    this.fetchCourses()
  },
  components: {
    lyAccordion, bCollapse, vBToggle
  }
}
</script>

<style scoped>
*:focus {
  outline-offset: 5px;
  outline: 2px dashed deepskyblue;
}

#search-bar:focus {
  outline-offset: 1rem;
}

.nav-margin {
  margin-top: 5rem;
}

.ly-del-btn * {
  color: white !important;
}

.catHeader {
  padding: 1rem;

  border-top: 2px solid black;
  background-color: #bbbcb7;

  cursor: pointer;

  position: sticky;
  top: 3rem;
}
</style>
