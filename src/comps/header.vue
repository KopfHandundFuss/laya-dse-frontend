<template>

  <div id="ly-header">
    <nav class="navbar sticky-top navbar-expand-sm navbar-dark">

      <!-- logo -->
      <router-link to="/" class="navbar-brand">
        <img style="width: 4rem"
             src="../assets/laya-logo-xs.png"
             alt="Laya - Learn as you are">
      </router-link>

      <busy-note class="text-white position-absolute"
                 style="font-size: 2rem; left: 50%"></busy-note>

      <!-- nav toggler -->
      <button type="button"
              class="navbar-toggler"
              data-toggle="collapse"
              data-target="#nav-collapse"
              aria-controls="nav-collapse"
              aria-extended="false"
              aria-label="Navigation schalten">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- nav list -->
      <div id="nav-collapse"
           class="collapse navbar-collapse flex-wrap mt-sm-3 mt-md-0">

        <!--
        <ul class="navbar-nav mr-auto" v-if="auth.online">
          <nav-item to="/courses">
            <span><i class="fas fa-graduation-cap"></i> {{i18n.courses}}</span>
          </nav-item>
          <nav-item to="/mycourses">
            <span><i class="fas fa-lock"></i> {{i18n.myCourses}}</span>
          </nav-item>
        </ul>

        <ul class="navbar-nav ml-auto" v-if="!auth.online">
          <nav-item to="/register">
            <span class="text-white">
              <i class="fas fa-arrow-right"></i> {{i18n.register}}
            </span>
          </nav-item>
        </ul>
        -->


        <!-- USER NAV -->
        <!--
        <ul class="navbar-nav">
          <nav-item to="/profile" v-if="auth.online">
            <span><i class="fas fa-user"></i> {{i18n.profile}}</span>
          </nav-item>
          <nav-item @click="logout" right v-if="auth.online">
            <span><i class="fas fa-sign-out-alt"></i> {{i18n.logout}}</span>
          </nav-item>
          <nav-item to="/login" v-else>
            <span><i class="fas fa-sign-in-alt"></i> {{i18n.login}}</span>
          </nav-item>
        </ul>
        -->

        <!-- LANG SELECTION -->
        <ul class="navbar-nav ml-auto">
          <nav-item-dd no-caret right>
            <img slot="button-content"
                 :src="icons[profile.lang]"
                 class="lang-icon" />

            <nav-item-dd-btn v-for="(svg, lang) in icons"
                             :key="lang"
                             @click="setLang(lang)">
              <img :src="svg" :alt="lang" class="lang-icon lang-icon-list"/>
            </nav-item-dd-btn>
          </nav-item-dd>
        </ul>

      </div>

    </nav>
  </div>
</template>

<script>
import navItem from 'bootstrap-vue/es/components/nav/nav-item'
import navItemDd from "bootstrap-vue/es/components/nav/nav-item-dropdown"
import navItemDdBtn from "bootstrap-vue/es/components/dropdown/dropdown-item-button.js"

import http from 'axios'
import { mapState } from 'vuex'

import * as i18n from '@i18n/header'
import {icons} from '@/misc/langs.js'
import busyNote from '@comps/busy-note'

export default {
  name: 'ly-header',
  data () {
    return {
      icons
    }
  },
  watch: {
    '$route': 'checkCourse'
  },
  computed: {
    ...mapState(['profile', 'auth', 'note']),
    i18n: function () {
      return i18n[this.$store.state.profile.lang]
    }
  },
  mounted: function () {
    this.checkCourse()
    this.$forceUpdate()
    let store = this.$store
    /*
     * get browser locale */
    http.get('lang')
      .then(function ({data}) {
        const lang = data.split("-")[0]
        store.commit('setLang', lang)
      })
      .catch(function () {
        store.commit('setLang', 'de')
      })
  },
  methods: {
    toggleMedia (type) {
      this.$store.commit('toggleMedia', type)
    },
    checkCourse () {
      this.isCourse = /courses[/]./.test(location.hash)
      this.$forceUpdate()
    },
    setLang (lang) {
      this.$store.commit('setLang', lang)
    },
    logout () {
      this.$ls.remove('auth')
      this.$store.commit('logout')
      this.$router.push('/login')
    }
  },
  components: {
    navItem,
    busyNote,
    navItemDd,
    navItemDdBtn
  }
}
</script>

<style scoped>
*:focus {
  outline: 2px dashed deepskyblue;
}

.navbar-brand {
  padding: 0;
  margin-top: -0.5rem;
  margin-bottom: -0.5rem;
  margin-left: -1rem;
}

#ly-header {
  position: sticky;
  top: 0;

  z-index: 11001;
}

.navbar {
  background-color: black;
}

.nav-link > span {
  color: white;
  padding-bottom: 0.25rem;
  border-bottom: 2px solid transparent;
}

.nav-link.active > span {
  border-bottom-color: #fff;
}

.media.active .nav-link > span {
  border-bottom-color: #fff;
}

.dropdown-menu {
  min-width: unset !important;
}

.dropdown-item {
  padding: 0.5rem 0.5rem;
}

.b-nav-dropdown img {
  width: 2rem;
}

.lang-icon {
  border: 1px solid grey;
}

.lang-icon-list {
  margin: 5px;
}
</style>
