<template>
  <form novalidate role="form" aria-label="Darstellungsauswahl" class="ly-media-selector">

    <div class="d-flex justify-content-between">
      <label>
        <input type="checkbox"
               @click="toggleMedia('simple')"
               :class="{active: profile.prefs.media.simple}"
               v-model="profile.prefs.media.simple"
               style="margin-right: 5px">
        </input>
        <ly-simple-icon></ly-simple-icon>
        <span>{{ i18n.easyLanguage }}</span>
      </label>
    </div>

  </form>
</template>

<script>
import http from 'axios'
import {mapGetters, mapState, mapMutations} from 'vuex'
import * as i18n from '@i18n/common'

import lySimpleIcon from '@comps/simple-icon'

export default {
  name: 'ly-media-selector',
  created () {
  },
  data () {
    return {
      content: {},
      contents: []
    }
  },
  computed: {
    ...mapState(['profile']),
    ...mapGetters(['isAuthor']),
    i18n: function () {
      return i18n[this.$store.state.profile.lang]
    }
  },
  methods: {
    ...mapMutations(['toggleMedia'])
  },
  components: {
    lySimpleIcon
  }
}
</script>

<style scoped>
* {
  user-select: none;
}

*:focus {
  outline-offset: 5px;
  outline: 2px dashed deepskyblue;
}

label {
  margin: 0px 5px;
}

</style>
