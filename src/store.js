/* eslint-disable no-param-reassign */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const LOCALSTORAGE_LANG_KEY = 'language';
const getBrowserLanguage = () => {
  const browserLanguage = window.navigator.language;
  if (browserLanguage) {
    return browserLanguage.split('-')[0];
  }
  return null;
};

export default new Vuex.Store({
  state: {
    lang: window.localStorage.getItem(LOCALSTORAGE_LANG_KEY) || getBrowserLanguage() || 'en',
  },
  mutations: {
    setLanguage(state, lang) {
      window.localStorage.setItem(LOCALSTORAGE_LANG_KEY, lang);
      state.lang = lang;
    },
  },
});
