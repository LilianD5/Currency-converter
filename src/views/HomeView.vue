<template>
  <header><h1 class="text-capitalize text-center py-2 py-lg-3 m-0">yet another currency converter</h1></header>
  <div id="background" class="position-absolute top-0 "></div>
  <section class="container-fluid col-11 col-md-10 col-lg-8 mx-auto card bg-light py-2 py-lg-4 mt-5 shadow-custom">
    <h2 class="text-capitalize text-center">currency conversion</h2>
    <div class="d-md-flex justify-content-between col-10 mx-auto">
      <div class="col-md-4 py-2 px-2">
        <label for="amount">Amount</label>
        <input name="amount" type="number" step="0.001" class="form-control" @change="currencyChange(baseCurrency, targetCurrency, amount)" v-model="amount">
      </div>

      <div class="col-md-4 py-2 px-2">
        <label for="baseCurrency" class="text-capitalize">convert :</label>
        <select name="baseCurrency" id="baseCurrency" class="text-uppercase form-select" @change="currencyChange(baseCurrency, targetCurrency, amount), allCurrenciesWithBase(baseCurrency)" v-model="baseCurrency">
          <AllCurrencies v-for="(item, key) in currenciesData" :key="key" :acronym="key" :name="item"></AllCurrencies>
        </select>
      </div>

      <div class="col-md-4 py-2 px-2">
        <label for="targetCurrency" class="text-capitalize">in</label>
        <select name="targetCurrency" id="targetCurrency" class="text-uppercase form-select" @change="currencyChange(baseCurrency, targetCurrency, amount)" v-model="targetCurrency">
          <AllCurrencies v-for="(item, key) in currenciesData" :key="key" :acronym="key" :name="item"></AllCurrencies>
        </select>
      </div>
    </div>
    <div class="mx-auto">
      <p class="text-uppercase py-2"><span>{{ amount }}</span> <span>{{ baseCurrency }}</span> = <span>{{ conversionValue }}</span> <span>{{ targetCurrency }}</span></p>
    </div>
  </section>

  <section class="card text-center mx-auto col-11 col-md-10 col-lg-8 card my-5 shadow-custom">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item col-7 col-md-6" id="for-one-link" v-on:click="forOneOption">
          <p class="nav-link active cursor-default text-capitalize text-truncate" id="for-one-text">Currencies value for 1 <span class="text-uppercase">{{ baseCurrency }}</span></p>
        </li>
        <li class="nav-item col-5 col-md-6" id="one-for-link" v-on:click="oneForOption">
          <p class="nav-link cursor-pointer text-capitalize text-truncate" id="one-for-text"><span class="text-uppercase">{{ baseCurrency }}</span> value for 1 unit of each currency</p>
        </li>
      </ul>
    </div>
    <div class="card-body" id="for-one-content">
      <h2 class="text-center pb-5 text-capitalize">Currencies value for 1 <span class="text-uppercase">{{ baseCurrency }}</span></h2>
      <ul class="d-flex justify-content-start flex-wrap ps-0">
        <CurrenciesValueForOne v-for="(item, key) in withBaseData" :key="key" :name="key" :value="item"></CurrenciesValueForOne>
      </ul>
    </div>
    <div class="card-body d-none" id="one-for-content">
      <h2 class="text-center pb-5 text-capitalize"><span class="text-uppercase">{{ baseCurrency }}</span> value for 1 unit each currency</h2>
      <ul class="d-flex justify-content-start flex-wrap ps-0">
        <CurrenciesValueOneFor v-for="(item, key) in withBaseData" :key="key" :name="key" :value="item"></CurrenciesValueOneFor>
      </ul>
    </div>
  </section>

  <p class="col-12 text-center pt-5">Developped by Lilian DIAZ - 2022 - Using <a href="https://vuejs.org/" target="_blank">Vue.js</a> | <a href="https://getbootstrap.com/" target="_blank">Bootstrap</a> | <a href="https://github.com/fawazahmed0/currency-api#readme" target="_blank">Currency API</a> | <a href="https://github.com/LilianD5" target="_blank">GitHub</a></p>

</template>

<script>
// @ is an alias to /src
import AllCurrencies from "@/components/Currencies.vue"
import CurrenciesValueForOne from "@/components/CurrenciesValueForOne.vue"
import ApiService from "@/services/api.service"
import CurrenciesValueOneFor from "@/components/CurrenciesValueOneFor.vue";

const apiService = new ApiService()

export default {
  name: "HomeView",
  components: {
    AllCurrencies,
    CurrenciesValueForOne,
    CurrenciesValueOneFor
},
  data () {
    return {
      currenciesData: null,
      baseCurrency: 'eur',
      baseData: null,
      targetCurrency: 'usd',
      amount: 1,
      conversionValue: null,
      withBaseData: null
    }
  },
  mounted () {
    this.allCurrencies()
    this.allCurrenciesWithBase(this.baseCurrency)
    this.currencyChange(this.baseCurrency, this.targetCurrency, this.amount)
  },
  methods: {
    async allCurrencies () {
      const res = await apiService.getAllCurrencies()
      const currencies = await res.json()
      this.currenciesData = currencies
      // console.log(currencies)
    },
    async currencyChange(baseCurrency, targetCurrency, amount) {
      const res = await apiService.getCurrencyChange(baseCurrency, targetCurrency)
      const base = await res.json()
      this.baseData = Object.values(base)[1]
      const value = amount * this.baseData
      // console.log(this.baseData)
      const round = Math.round(value*100)/100
      this.conversionValue = round
    },
    async allCurrenciesWithBase(acronym){
      const res = await apiService.getAllCurrenciesWithBase(acronym)
      const currencies = await res.json()
      this.withBaseData = Object.values(currencies)[1]
      // console.log(currencies);
    },
    oneForOption() {
      const oneForText = document.querySelector('#one-for-text')
      const forOneText = document.querySelector('#for-one-text')
      const oneForLink = document.querySelector('#one-for-link')
      const forOneLink = document.querySelector('#for-one-link')
      const oneForContent = document.querySelector('#one-for-content')
      const forOneContent = document.querySelector('#for-one-content')

      oneForLink.classList.remove('col-5')
      forOneLink.classList.remove('col-7')
      oneForLink.classList.add('col-7')
      forOneLink.classList.add('col-5')

      forOneText.classList.remove('active', 'cursor-default')
      forOneText.classList.add('cursor-pointer')
      oneForText.classList.add('active', 'cursor-default')

      forOneContent.classList.add('d-none')
      oneForContent.classList.remove('d-none')
    },
    forOneOption() {
      const oneForText = document.querySelector('#one-for-text')
      const forOneText = document.querySelector('#for-one-text')
      const oneForLink = document.querySelector('#one-for-link')
      const forOneLink = document.querySelector('#for-one-link')
      const oneForContent = document.querySelector('#one-for-content')
      const forOneContent = document.querySelector('#for-one-content')

      oneForLink.classList.remove('col-7')
      forOneLink.classList.remove('col-5')
      oneForLink.classList.add('col-5')
      forOneLink.classList.add('col-7')

      forOneText.classList.add('active', 'cursor-default')
      oneForText.classList.remove('active', 'cursor-default')
      oneForText.classList.add('cursor-pointer')

      forOneContent.classList.remove('d-none')
      oneForContent.classList.add('d-none')
    }
  }
};
</script>
