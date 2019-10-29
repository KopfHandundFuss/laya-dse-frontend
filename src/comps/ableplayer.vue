<template>
  <div class="ly-ableplayer">

    <template v-if="main_ok">
      <video :id="playerId"
        preload="auto"
        height="480"
        width="720"
        :data-lang="lang" data-force-lang>

        <template v-if="sign_ok">
          <source type="video/mp4" :src="src" :data-sign-src="sign">
        </template>
        <template v-else>
          <source type="video/mp4" :src="src">
        </template>

        <template v-if="sub_ok">
          <track kind="captions" :src="sub" default>
        </template>

      </video>
    </template>
    <template v-else>
      <h1>{{ i18n.videoDoesNotYetExist }}</h1>
    </template>

  </div>
</template>

<script>
import http from "axios"
import * as i18n from '@i18n/common'

export default {
  name: 'ly-ableplayer',
  data () {
    return {
      main_ok: false,
      sign_ok: false,
      sub_ok: false,
      ableplayer: null
    }
  },
  props: {
    src: String,
    sign: String,
    sub: String
  },
  mounted: function () {
    const ctx = this

    http.get(ctx.src).then(() => { ctx.main_ok = true })
    http.get(ctx.sign).then(() => { ctx.sign_ok = true })
    http.get(ctx.sub).then(() => { ctx.sub_ok = true })

    const el = document.getElementById(this.playerId)
    this.ableplayer = new window.AblePlayer(el)
  },
  computed: {
    i18n: function () {
      return i18n[this.$store.state.profile.lang]
    },
    playerId: function () {
      return `ly-ableplayer-video-${this._uid}`
    },
    lang: function () {
      return this.$store.state.profile.lang
    }
  }
}
</script>

<style>
.able * {
  box-sizing: content-box;
}
.able {
  box-shadow: none;
  border: 1px solid #d3d3d3;
}
</style>
