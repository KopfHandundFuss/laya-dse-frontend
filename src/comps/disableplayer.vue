<template>
  <div class="ly-disableplayer" >

    <!-- original copy -->
    <div class="d-none">
      <video :id="playerId" preload="auto" :width="pw" data-force-lang>
        <template v-if="main_ok && sign_ok">
          <source type="video/mp4" :src="src" :data-sign-src="sign">
        </template>
        <template v-if="main_ok && !sign_ok">
          <source type="video/mp4" :src="src">
        </template>
        <template v-if="sub_ok">
          <track kind="captions" :src="sub" default>
        </template>
      </video>
    </div>

    <div v-show="busy" class="vid-loader">
      <i class="fas fa-circle-notch fa-spin"></i>
    </div>

    <!-- ableplayer target container -->
    <div v-show="main_ok && !busy">
      <div :id="playerContainerId"></div>
    </div>
    <div v-show="!main_ok && !busy">
      <h1 style="text-align: center; margin-top: 2rem">
        {{ i18n.videoDoesNotYetExist }} <i class="far fa-grin-beam-sweat"></i>
      </h1>
    </div>

  </div>
</template>

<script>
import $ from "jquery"
import http from "axios"
import { mapState } from 'vuex'
import * as i18n from '@i18n/common'

export default {
  name: 'ly-disableplayer',
  data () {
    return {
      main_ok: false,
      sign_ok: false,
      sub_ok: false,

      busy: false,
      ableplayer: null
    }
  },
  props: {
    src: String,
    sign: String,
    sub: String
  },
  watch: {
    src: function () {
      this.checkSources()
    }
  },
  mounted: function () {
    this.checkSources()
  },
  computed: {
    ...mapState(['profile']),
    i18n: function () {
      return i18n[this.$store.state.profile.lang]
    },
    playerId: function () {
      return `ly-ableplayer-${this._uid}`
    },
    playerCopyId: function () {
      return `${this.playerId}-copy`
    },
    playerContainerId: function () {
      return `${this.playerId}-container`
    },
    pw: function () {
      return window.innerWidth * 0.42
    }
  },
  methods: {
    checkSources: function () {
      const ctx = this
      ctx.busy = true

      // check src
      http.get(ctx.src)
        .then(() => {
          ctx.main_ok = true
          //
          // check sign
          http.get(ctx.sign)
            .then(() => {
              ctx.sign_ok = true
              //
              // check sub
              http.get(ctx.sub)
                .then(() => {
                  ctx.sub_ok = true
                })
                .catch(() => { ctx.sub_ok = false })
                .then(() => { ctx.$forceUpdate(); ctx.reloadPlayer() })
            })
            .catch(() => {
              ctx.sign_ok = false
              ctx.$forceUpdate()
              ctx.reloadPlayer()
            })
        })
        .catch(() => {
          ctx.main_ok = false
          ctx.busy = false
          ctx.$forceUpdate()
        })
    },
    reloadPlayer: function () {
      const ctx = this
      ctx.busy = true

      ctx.ableplayer = null
      const playerContainer = $(`#${ctx.playerContainerId}`)
      playerContainer.empty()

      setTimeout(function () {
        if (ctx.ableplayer !== null) return
        ctx.busy = false
        const playerCopy = $(`#${ctx.playerId}`).clone()
        playerCopy.attr("data-lang", (ctx.profile.lang === "pl" ? "en" : ctx.profile.lang))
        console.log("Player lang: ", playerCopy.attr("data-lang"))
        playerContainer.append(playerCopy)
        ctx.ableplayer = new window.AblePlayer(playerCopy)
      }, 2000)
    }
  }
}
</script>

<style>
.ly-disableplayer {
  position: sticky;
  top: 8rem;
}

.vid-loader {
  height: 50vh;
  font-size: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.able * {
  box-sizing: content-box;
}
.able {
  box-shadow: none;
  border: 1px solid #d3d3d3;
}

.able-sign-window {
  width: 75% !important;
  margin: 0;
  top: 0 !important;
  left: 101% !important;
}

.able-transcript-area {
  width: 75% !important;
  top: 51% !important;
  left: 101% !important;
  height: 49%;
}
.able-transcript {
  height: 85%;
}

.able-transcript-area .able-window-toolbar {
  padding: 5px;
}
.able-window-toolbar {
  min-height: 25px;
}
.able-window-toolbar label {
  margin: 0 10px 0 0 !important;
  font-size: 90%;
}
.able-window-toolbar input {
  vertical-align: middle;
}
.able-window-toolbar button {
  line-height: unset;
}
.able-window-toolbar img {
  padding: 2px;
  vertical-align: top;
}
.able-resizable {
  display: none;
}
.able-transcript {
  padding: 0px 10px;
}
.able-transcript-container {
  margin: 10px 0px !important;
}
.able-transcript-heading {
  font-size: 90%;
}
</style>
