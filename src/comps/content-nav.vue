<template>
  <div id="navigation-sidebar"
       aria-labelledy="navigation-titel"
       role="navigation">

    <h4 id="navigation-titel">
      <span class="sr-only">{{ i18n.submenu }}</span>
      <span>{{ i18n.content }}</span>
    </h4>

    <div>

      <div class="toc">
        <router-link to="/dse/overview">
          <span>{{ i18n.overview }}</span>
        </router-link>
      </div>

      <div class="toc">
        <span>{{ i18n.longTermSupport }}</span>
        <router-link to="/dse/long-term-support-1">
          <span>{{ i18n.skillsAndTalents }}</span>
        </router-link>
        <router-link to="/dse/long-term-support-2">
          <span>{{ i18n.yourMap }}</span>
        </router-link>
        <router-link to="/dse/long-term-support-3">
          <span>{{ i18n.motivationAndEmotionalIntelligence }}</span>
        </router-link>
        <router-link to="/dse/long-term-support-4">
          <span>{{ i18n.alliancesCompromisesAndResources }}</span>
        </router-link>
        <router-link to="/dse/long-term-support-5">
          <span>{{ i18n.skillsToStartABusiness }}</span>
        </router-link>
      </div>

      <div class="toc">
        <span>{{ i18n.accountingAndFinance }}</span>
        <router-link to="/dse/accounting-finance-1">
          <span>{{ i18n.settingUpYourOwnBusiness }}</span>
        </router-link>
        <router-link to="/dse/accounting-finance-2">
          <span>{{ i18n.accountingBasics }}</span>
        </router-link>
        <router-link to="/dse/accounting-finance-3">
          <span>{{ i18n.openingABankAccount }}</span>
        </router-link>
        <router-link to="/dse/accounting-finance-4">
          <span>{{ i18n.businessPlanBasicInformation }}</span>
        </router-link>
        <router-link to="/dse/accounting-finance-5">
          <span>{{ i18n.taxes }}</span>
        </router-link>
        <router-link to="/dse/accounting-finance-6">
          <span>{{ i18n.legalFormsOfEmployment }}</span>
        </router-link>
      </div>

      <div class="toc">
        <span>{{ i18n.marketingAndSales }}</span>
        <router-link to="/dse/marketing-sales-1">
          <span>{{ i18n.whatAreMyProducts }}</span>
        </router-link>
        <router-link to="/dse/marketing-sales-2">
          <span>{{ i18n.whoAreMyClients }}</span>
        </router-link>
        <router-link to="/dse/marketing-sales-3">
          <span>{{ i18n.communication }}</span>
        </router-link>
        <router-link to="/dse/marketing-sales-4">
          <span>{{ i18n.positioning }}</span>
        </router-link>
        <router-link to="/dse/marketing-sales-5">
          <span>{{ i18n.sales }}</span>
        </router-link>
        <router-link to="/dse/marketing-sales-6">
          <span>{{ i18n.uniqueSellingPoints }}</span>
        </router-link>
      </div>

      <div class="toc">
        <span>{{ i18n.publicRelations }}</span>
        <router-link to="/dse/public-relations-1">
          <span>{{ i18n.introduction }}</span>
        </router-link>
        <router-link to="/dse/public-relations-2">
          <span>{{ i18n.strategy }}</span>
        </router-link>
        <router-link to="/dse/public-relations-3">
          <span>{{ i18n.communication }}</span>
        </router-link>
        <router-link to="/dse/public-relations-4">
          <span>{{ i18n.messagesAndTools }}</span>
        </router-link>
        <router-link to="/dse/public-relations-5">
          <span>{{ i18n.digitalPRAndSMRevolution }}</span>
        </router-link>
      </div>

      <div class="toc">
        <span>{{ i18n.it }}</span>
        <router-link to="/dse/it-1">
          <span>{{ i18n.cloudVSOnPremises }}</span>
        </router-link>
        <router-link to="/dse/it-2">
          <span>{{ i18n.email }}</span>
        </router-link>
        <router-link to="/dse/it-3">
          <span>{{ i18n.onlineMarketing }}</span>
        </router-link>
        <router-link to="/dse/it-4">
          <span>{{ i18n.webshop }}</span>
        </router-link>
        <router-link to="/dse/it-5">
          <span>{{ i18n.website }}</span>
        </router-link>
      </div>

    </div>

  </div>
</template>

<script>
import * as i18n from '@i18n/contentnav'

export default {
  name: 'content-nav',
  computed: {
    i18n: function () {
      return i18n[this.$store.state.profile.lang]
    }
  }
}
</script>

<style scoped>
*:focus {
  outline: 2px dashed deepskyblue;
  outline-offset: 5px;
}

.toc > span {
  display: block;

  font-weight: bold;
  color: black;
  padding: 10px 0px 10px 10px;
  border-bottom: 1px solid #d3d3d3;
  margin-top: 10px;
}
.toc > a {
  display: block;

  color: black;
  margin-bottom: 5px;
  padding: 10px 0px 10px 10px;
  font-size: 90%;
}
.toc > a:hover {
  background-color: #e9e9e9;
  text-decoration: initial;
}
.toc > a > span {
  text-decoration: underline;
}

.router-link-active {
  background-color: #d3d3d3;
  text-decoration: initial;
}
</style>
