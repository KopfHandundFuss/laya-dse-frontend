<template>
  <ly-video-wrapper>
    Ich bin ein Inhalt, holt mich hier raus!
  </ly-video-wrapper>
  <!--
  <ly-ableplayer :data="{}"></ly-ableplayer>
  -->
</template>

<script>
import lyAbleplayer from './../comps/ableplayer'
import lyVideoWrapper from './../comps/video-wrapper'

export default {
  name: 'test-view',
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  components: {
    lyAbleplayer,
    lyVideoWrapper
  }
}
</script>

<style scoped></style>
