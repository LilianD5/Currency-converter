export default class ApiService {
    getAllCurrencies () {
        return fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json')
    }

    getAllCurrenciesWithBase (acronym) {
        return fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${acronym}.json`)
    }

    getCurrencyChange(base, target) {
        return fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${base}/${target}.json`)
    }
}
  