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
        v-model="form.primary_color"
        required
        :placeholder="$t('airlines.form.primaryColor.placeholder')"
      />
    </b-form-group>
    <b-form-group :label="$t('airlines.form.secondaryColor.label')" label-for="secondary_color">
      <b-form-input
        id="secondary_color"
        v-model="form.secondary_color"
        required
        :placeholder="$t('airlines.form.secondaryColor.placeholder')"
      />
    </b-form-group>
    <b-form-group label="Using sub-components:">
      <b-form-checkbox-group id="checkbox-group-2" v-model="form.services" name="flavour-2">
        <b-form-checkbox v-for="service in services" :key="service.key" :value="service.key">{{
          service.key
        }}</b-form-checkbox>
      </b-form-checkbox-group>
    </b-form-group>
  </b-form>
</template>

<script>
import services from '@/assets/js/services';

export default {
  data() {
    return {
      services,
      form: {
        iata: '',
        name: '',
        primary_color: '',
        secondary_color: '',
        services: [],
      },
    };
  },
  watch: {
    form: {
      deep: true,
      handler(form) {
        this.$emit('change', form);
      },
    },
  },
};
</script>

<style></style>
