<template>
  <div id="app">
    <ly-header></ly-header>
    <router-view></router-view>
    <ly-footer></ly-footer>
  </div>
</template>

<script>
import lyHeader from '@comps/header'
import lyFooter from '@comps/footer'

export default {
  name: 'app',
  watch: {
    '$route': 'relocateUnauthorized'
  },
  created () {
    /*
     * restore auth from local storage */
    let auth = this.$ls.get('auth', false)
    if (!auth) return
    console.log('Auth restored')
    this.$store.commit('login', auth)
    this.$store.dispatch('fetchProfile')
    this.$store.dispatch('fetchRole')
  },
  methods: {
    relocateUnauthorized () {
      /* DSE Speciale */
      let dse = true
      if (dse) return

      /* pass access if auth true */
      if (this.$ls.get('auth', false)) return

      const publicURLs = [
        '#/',
        '#/login',
        '#/register',
        '#/imprint',
        '#/privacy',
        '#/dse',
        '#/dse/overview',
        '#/dse/long-term-support',
        '#/dse/accounting-finance',
        '#/dse/marketing-sales',
        '#/dse/public-relations',
        '#/dse/it'
      ]

      /* target url is public */
      if (publicURLs.includes(location.hash)) return

      /* auth first */
      this.$router.push('/login')
    }
  },
  components: { lyHeader, lyFooter }
}
</script>

<style>
html, body {
  font-family: 'Karla', sans-serif !important;

  font-size: 18px;
  line-height: 26px;
}

.ly-bg-grey {
  background-color: #ebece7;
}

.ly-bg-author {
  background-color: lightblue;
}

.ly-author-hint {
  border: 1px solid #337ab7;
  box-shadow: inset 0px 0px 8px #337ab7;
}

.ly-link-text {
  color: black !important;
  border-bottom: 0.2rem solid black;
  text-decoration: none !important;
}

.ly-link-btn {
  border: 0.2rem solid black;
  padding: 0.7rem;
  margin-bottom: 0;
}

.ly-text-help {
  color: #777;
}

.ly-search-bar {
  width: 100%;
  border: 2px solid black;
  display: flex;
  align-items: center;
  padding: 0.5rem;
}
.ly-search-bar input {
  flex: 2;
  border: none;
}

.debug {
  position: fixed;
  left: 0;
  bottom: 0;
  border: 1px dashed blue;
  background-color: whitesmoke;
}

.ly-focus:focus {
  outline: 2px dashed deepskyblue;
}

.plyr--hide-controls .plyr__captions {
  transform: unset;
}

.plyr__captions {
  padding: 0px;
  transform: unset;
}

.add-vid-container .plyr__control {
  z-index: -1 !important;
}
.add-vid-container .plyr__controls {
  z-index: -1 !important;
}

.breadcrumb {
  display: inline-flex;
  padding: 0;
  margin: 0;
  background-color: transparent;
}

.breadcrumb-item > a {
  color: whitesmoke;
  font-size: 90%;
  text-decoration: underline;
}

.breadcrumb-item > span {
  color: white;
  font-weight: bold;
}

.breadcrumb-item::before {
    color: whitesmoke !important;
}

.dropdown-menu {
  padding: 0;
  min-width: unset !important;
  border: 1px solid grey;
}
.dropdown-item {
  padding: 0;
}
</style>
