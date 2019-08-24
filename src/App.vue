<template>
  <div id="app">
    <b-navbar type="dark" variant="primary">
      <b-navbar-brand :to="{ name: 'home' }">Airlines crud</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown :text="$i18n.locale.toLocaleUpperCase()" right>
            <b-dropdown-item
              href="#"
              v-for="lang in langs"
              :key="lang" @click="setCurrentLocale(lang)"
            >
              {{ lang.toLocaleUpperCase() }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container fluid>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      langs: Object.keys(this.$i18n.messages),
    };
  },
  methods: {
    setCurrentLocale(lang) {
      this.$i18n.locale = lang;
    },
  },
};
</script>

<style lang="scss">
</style>
