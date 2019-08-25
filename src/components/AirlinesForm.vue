<template>
  <b-form>
    <b-form-group :label="$t('airlines.form.iata.label')" label-for="input-1">
      <b-form-input
        id="iata"
        v-model="form.iata"
        type="text"
        required
        :placeholder="$t('airlines.form.iata.placeholder')"
      />
    </b-form-group>
    <b-form-group :label="$t('airlines.form.name.label')" label-for="name">
      <b-form-input
        id="name"
        v-model="form.name"
        required
        :placeholder="$t('airlines.form.name.placeholder')"
      />
    </b-form-group>
    <b-form-group :label="$t('airlines.form.primaryColor.label')" label-for="primary_color">
      <b-form-input
        id="primary_color"
        type="color"
        v-model="form.primary_color"
        required
        :placeholder="$t('airlines.form.primaryColor.placeholder')"
      />
    </b-form-group>
    <b-form-group :label="$t('airlines.form.secondaryColor.label')" label-for="secondary_color">
      <b-form-input
        id="secondary_color"
        type="color"
        v-model="form.secondary_color"
        required
        :placeholder="$t('airlines.form.secondaryColor.placeholder')"
      />
    </b-form-group>
    <b-form-group :label="$t('airlines.form.services.label')">
      <b-form-checkbox-group id="services" v-model="form.services" name="services">
        <b-form-checkbox v-for="service in services" :key="service.key" :value="service.key">
          {{ $t(`services.${service.key}`) }}
        </b-form-checkbox>
      </b-form-checkbox-group>
    </b-form-group>
  </b-form>
</template>

<script>
import Color from 'color';
import services from '@/assets/js/services';

export default {
  data() {
    return {
      services,
      form: {},
    };
  },
  props: {
    item: {
      type: Object,
      required: false,
    },
  },
  methods: {
    initData() {
      if (this.item) {
        const primaryColor = Color(this.item.primary_color);
        const secondaryColor = Color(this.item.secondary_color);
        this.form = {
          iata: this.item.iata,
          name: this.item.name,
          primary_color: primaryColor.hex(),
          secondary_color: secondaryColor.hex(),
          services: [...this.item.services],
        };
      } else {
        this.form = {
          iata: '',
          name: '',
          primary_color: '#41b883',
          secondary_color: '#35495e',
          services: [],
        };
      }
    },
  },
  watch: {
    form: {
      deep: true,
      handler(form) {
        this.$emit('change', form);
      },
    },
    item: {
      deep: true,
      immediate: true,
      handler() {
        this.initData();
      },
    },
  },
};
</script>

<style></style>
