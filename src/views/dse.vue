<template>

  <!-- header -->
  <div class="container-fluid">

    <div role="banner" class="row">
      <div class="col header text-center">
        <h1>Disabled and Self-Employed</h1>
      </div>
    </div>

    <div class="row">

      <!-- NAVBAR -->
      <div class="col-3">
        <div class="sidebar">
          <ly-content-nav></ly-content-nav>
        </div>
      </div>

      <!-- CONTENT -->
      <div class="col-9 pl-0">
        <!-- <h2>{{ moduleMap[$route.params.module] }}</h2> -->
        <div class="media-selector-wrapper">
          <ly-media-selector></ly-media-selector>
        </div>

        <ly-ableplayer :src="getVid()" :sign="getSign()" :sub="getSub()">
        </ly-ableplayer>

        <!--
        <h4><i class="fas fa-pencil-alt"></i><span>Quiz</span></h4>
        <keep-alive>
          <ly-choice :url="getQuiz()"></ly-choice>
        </keep-alive>
        -->
      </div>

    </div>
  </div>
</template>

<script>
import lyMediaSelector from '@comps/media-selector'
import lyContentNav from '@comps/content-nav.vue'
import lyAbleplayer from '@comps/disableplayer.vue'
import backendUrl from "@/backend-url.js"
import awsUrl from '../awsURL.js'
import lyChoice from "@comps/quiz-choice.vue"

const dseVideoPath = awsUrl() + '/dse/videos'

export default {
  name: 'dse-view',
  created () {
  },
  data () {
    return {
      moduleMap: {
        "overview": "Overview",
        "long-term-support": "Long Term Support",
        "accounting-finance": "Accouning & Finance",
        "marketing-sales": "Marketing & Sales",
        "public-relations": "Public Relations",
        "it": "IT"
      }
    }
  },
  computed: {
  },
  methods: {
    backend: function (file) {
      return `${backendUrl}/storage/dse/download/${file}`
    },
    getVid: function () {
      const id = this.$route.params.module
      const lang = this.$store.state.profile.lang
      const easy = this.$store.state.profile.prefs.media.simple
        ? ".easy" : ""
      return `${dseVideoPath}/${id}.${lang}${easy}.mp4`
    },
    getSign: function () {
      const id = this.$route.params.module
      const lang = this.$store.state.profile.lang
      return `${dseVideoPath}/${id}.${lang}.sign.mp4`
    },
    getSub: function () {
      const id = this.$route.params.module
      const lang = this.$store.state.profile.lang
      const easy = this.$store.state.profile.prefs.media.simple
        ? ".easy" : ""
      return `${dseVideoPath}/${id}.${lang}${easy}.vtt`
    },
    getQuiz: function () {
      const id = this.$route.params.module
      const lang = this.$store.state.profile.lang
      const easy = this.$store.state.profile.prefs.media.simple
        ? ".easy" : ""
      return `storage/dse/download/${id}.${lang}${easy}.json`
    }

  },
  components: {
    // lyContentIcon,
    lyChoice,
    lyAbleplayer,
    lyContentNav,
    lyMediaSelector
  }
}
</script>

<style scoped>
*:focus {
  outline: 2px dashed deepskyblue;
  outline-offset: 5px;
}

.media-selector-wrapper {

  position: sticky;
  top: 4rem;

  border: 1px solid #d3d3d3;
  padding: 20px 10px 10px 10px;
  z-index: 11000;

  background-color: white;
}

.header {
  padding-top: 6rem;
  padding-bottom: 3rem;
  margin-bottom: 2rem;
  color: whitesmoke;
  background-color: #343a40;
}

.sidebar {
  position: sticky;
  top: 6rem;

  border-right: 1px solid #d3d3d3;
}

[v-cloak] {
  display: none !important;
}
</style>
