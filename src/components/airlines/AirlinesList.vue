<template>
  <b-row>
    <b-col md="4">
      <b-button
        data-cy="button-create-airline"
        variant="primary"
        class="mt-3"
        block
        :to="{ name: 'airlines-create' }"
        >{{ $t('crud.createButton') }}</b-button
      >
      <b-form-input
        class="mt-3"
        id="search"
        v-model="search"
        :placeholder="$t('airlines.filters.search.placeholder')"
      />
      <div class="mt-3">
        <b-card no-body>
          <template #header>
            <span>{{ $t('airlines.filters.services.header') }}</span>
            <b-button
              class="float-right p-0  text-decoration-none"
              size="sm"
              variant="link"
              v-if="isActiveServicesFilter"
              @click="clearServicesFilters"
            >
              {{ $t('airlines.filters.services.clear') }}
            </b-button>
          </template>
          <b-list-group flush>
            <b-list-group-item
              button
              v-for="service in services"
              :key="service.key"
              @click="service.state = !service.state"
              class="d-flex justify-content-between align-items-center"
              :variant="isActiveServicesFilter && !service.state ? 'light' : ''"
              :active="service.state"
            >
              <span>
                <font-awesome-icon class="mr-1" :icon="service.icon" />
                {{ $t(`services.${service.key}`) }}
              </span>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </div>
    </b-col>
    <b-col>
      <b-list-group class="mt-3">
        <airlines-item v-for="airline in filteredAirlines" :key="airline.id" :airline="airline" />
      </b-list-group>
    </b-col>
  </b-row>
</template>

<script>
import AirlinesItem from '@/components/airlines/AirlinesItem.vue';
import services from '@/assets/js/services';

export default {
  name: 'AirlinesList',
  components: {
    AirlinesItem,
  },
  data() {
    return {
      search: '',
      services: Object.values(services).map(service => {
        return {
          ...service,
          state: false,
        };
      }),
    };
  },
  computed: {
    isActiveSearchFilter() {
      return this.search.length > 0;
    },
    isActiveServicesFilter() {
      return this.markedServices.length !== 0;
    },
    markedServices() {
      return this.services.filter(service => service.state);
    },
    searchString() {
      return this.search.toLocaleLowerCase();
    },
    filteredAirlines() {
      if (!this.isActiveSearchFilter && !this.isActiveServicesFilter) {
        return this.items;
      }
      return this.items.filter(airline => {
        return (
          (!this.isActiveSearchFilter || this.matchesSearch(airline)) &&
          (!this.isActiveServicesFilter || this.matchesServices(airline))
        );
      });
    },
  },
  methods: {
    matchesSearch(airline) {
      return (
        airline.iata.toLowerCase().includes(this.searchString) ||
        airline.name.toLowerCase().includes(this.searchString)
      );
    },
    matchesServices(airline) {
      return !this.markedServices.find(
        markedService => !airline.services.includes(markedService.key),
      );
    },
    clearServicesFilters() {
      this.services = this.services.map(service => {
        return Object.assign(service, { state: false });
      });
    },
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.service-toggle {
  * {
    cursor: pointer;
  }
}
</style>
