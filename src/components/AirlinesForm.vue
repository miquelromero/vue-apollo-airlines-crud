<template>
  <b-form>
    <b-form-group :label="$t('airlines.form.iata.label')" label-for="IATA">
      <b-form-input
        id="iata"
        v-model="form.iata"
        type="text"
        maxlength="2"
        required
        style="text-transform: uppercase;"
        :placeholder="$t('airlines.form.iata.placeholder')"
      />
    </b-form-group>
    <b-form-group :label="$t('airlines.form.name.label')" label-for="name">
      <b-form-input
        id="name"
        type="text"
        maxlength="50"
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
    <b-alert :show="updatedByOtherUser" class="mb-0" variant="warning">
      {{ $t('airlines.form.alerts.updatedByOtherUser') }}
    </b-alert>
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
      updatedByOtherUser: false,
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
          iata: this.item.iata.toUpperCase(),
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
  computed: {
    isValid() {
      if (!this.form.iata || this.form.iata.length !== 2) {
        return false;
      }
      if (!this.form.name || this.form.name.length === 0) {
        return false;
      }
      return true;
    },
  },
  watch: {
    form: {
      deep: true,
      handler(form) {
        this.$emit('change', form);
      },
    },
    isValid: {
      immediate: true,
      handler(isValid) {
        this.$emit('validate', isValid);
      },
    },
    item: {
      deep: true,
      immediate: true,
      handler(updatedItem, previousItem) {
        this.updatedByOtherUser = updatedItem && previousItem && updatedItem.id === previousItem.id;
        if (!this.updatedByOtherUser) {
          this.initData();
        }
      },
    },
  },
};
</script>

<style></style>
