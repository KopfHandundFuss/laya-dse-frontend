<template>
  <div class="root-view">

    <div class="container">
      <div class="row">
        <div class="col">
          <div style="height: 5rem"></div>
          <center>
            <img src="../assets/start.svg" style="width: 60%" alt="Laya">
            <div style="height: 1.5rem;"></div>
            <h1>{{ msg.title }}</h1>
            <h4>{{ msg.subtitle }}</h4>
            <div style="height: 1.5rem;"></div>
          </center>
        </div>
      </div>
    </div>

    <div class="ly-bg-grey">
      <div class="container py-5">
        <div class="row align-items-center">
          <div class="col-4 text-center">
            <img src="../assets/einfach.svg"
                 alt="Lernen für alle"
                 style="width: 5rem"> 
          </div>
          <div class="col-8">
            <h5 class="text-left" v-html="msg.promoText1"></h5>
          </div>
        </div>
      </div>
    </div>

    <div class="container py-5">
      <div class="row align-items-center">
        <div class="col-8">
          <h5 class="text-right" v-html="msg.promoText2"></h5>
        </div>
        <div class="col-4 text-center">
          <span style="font-size: 4rem">
            <i class="fas fa-deaf"></i>
            <i class="fas fa-low-vision"></i>
            <i class="fas fa-sign-language"></i>
          </span>
        </div>
      </div>
    </div>

    <div class="ly-bg-grey">
      <div class="container py-5">
        <div class="row align-items-center">
          <div class="col-4 text-center">
            <i class="fas fa-universal-access" style="font-size: 5rem"></i>
          </div>
          <div class="col-8">
            <h5 class="text-left">{{ msg.promoText3 }}</h5>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5 text-center">
      <router-link to="/register">
        <button type="button" class="btn btn-outline-dark btn-lg">
          <i class="fas fa-arrow-right"></i> {{ msg.register }}
        </button>
      </router-link>
    </div>

  </div>
</template>

<script>
import * as i18n from '@i18n/root'

export default {
  name: 'root-view',
  data () {
    return {
    }
  },
  computed: {
    msg: function () {
      return i18n[this.$store.state.profile.lang]
    }
  },
  components: {
  }
}
</script>

<style scoped>
*:focus {
  outline: 5px dashed deepskyblue;
}
</style>
