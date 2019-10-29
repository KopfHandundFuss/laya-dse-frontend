<template>
  <span class="ly-simple-icon">
    <i class="lc fas fa-circle"></i>
    <i class="rc fas fa-circle"></i>
    <i class="text far fa-comment-alt"></i>
  </span>
</template>

<script>
export default {
  name: 'ly-simple-icon'
}
</script>

<style scoped>
.ly-simple-icon {
  position: relative;
}
.ly-simple-icon .lc {
  position: absolute;
  top: 0.85em;
  left: 0.45em;
  font-size: 0.38em;
}
.ly-simple-icon .rc {
  position: absolute;
  top: 0.85em;
  right: 0.45em;
  font-size: 0.38em;
}
.ly-simple-icon .text {
  font-size: 1.2em;
  vertical-align: text-bottom;
}
</style>
