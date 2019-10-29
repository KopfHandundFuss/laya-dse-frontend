<template>
  <footer id="ly-footer">

    <div class="container"
         style="border-top: 0.2rem solid black; padding-top: 1rem;">

      <div class="row">

        <div class="col-12 col-lg-12">

          <!-- socials row -->
          <div class="row no-gutters">
            <!-- social media links -->
            <div class="col" style="padding-bottom: 1rem">
              <a href="https://www.facebook.com/projectDSE/"
                 target="_blank" class="social-link">
                <img src="../assets/facebook.svg" alt="Facebook Link">
              </a>
            </div>
            <!-- partner logo -->
            <div class="row justify-content-end" style="padding-bottom: 1rem">
              <div class="col-4">
                <a href="https://www.erasmusplus.de/" target="_blank">
                  <img src="../assets/eu-logo-gross.png" alt="Logo von Erasmus Plus" class="w-100">
                </a>
              </div>
              <div class="col-4">
                <a href="https://www.erasmusplus.de/" target="_blank">
                  <img src="../assets/ka2.png" alt="Logo von Erasmus Plus Erwachsenenbildung" class="w-100">
                </a>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <p><b>LAYA</b></p>
              <p><b>{{ i18n.laya }}</b></p>
            </div>
            <div class="col">
              <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">
                <img alt="Creative Commons Lizenzvertrag" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" />
              </a><br /><span style="font-size: small">Dieses Werk ist lizenziert unter einer <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">
              Creative Commons Namensnennung - Nicht-kommerziell - Weitergabe unter gleichen Bedingungen 4.0 International Lizenz</a>.</span>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <a href="#/imprint"><u class="text-dark">{{ i18n.imprint }}</u></a>
              <span>/</span>
              <a href="#/privacy"><u class="text-dark">{{ i18n.privacy }}</u></a>
            </div>
          </div>

        </div>

      </div>

    </div>

  </footer>
</template>

<script>
import * as i18n from '@i18n/footer'

export default {
  name: 'ly-footer',
  data () {
    return {
    }
  },
  computed: {
    i18n: function () {
      return i18n[this.$store.state.profile.lang]
    }
  },
  components: {}
}
</script>

<style scoped>
*:focus {
  outline: 2px dashed deepskyblue;
  outline-offset: 5px;
}

footer {
  margin-top: 5rem;
  margin-bottom: 10rem;
}

.social-link:first-child {
  margin-left: 0px;
}
.social-link {
  margin: 5px;
}
</style>
