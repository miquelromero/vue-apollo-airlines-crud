<template>
  <div id="app">
    <b-navbar>
      <b-navbar-brand :to="{ name: 'airlines' }">{{ $t('title') }}</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown :text="this.lang.toLocaleUpperCase()" right>
            <b-dropdown-item
              href="#"
              v-for="lang in langs"
              :key="lang"
              @click="changeLanguage(lang)"
            >
              {{ lang.toLocaleUpperCase() }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      langs: Object.keys(this.$i18n.messages),
    };
  },
  computed: {
    ...mapState(['lang']),
  },
  created() {
    this.changeLanguage(this.lang);
  },
  methods: {
    ...mapMutations(['setLanguage']),
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      this.setLanguage(lang);
    },
  },
};
</script>

<style lang="scss"></style>
