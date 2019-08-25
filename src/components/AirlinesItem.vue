<template>
  <b-list-group-item
    :to="{ name: 'airlines-edit', params: { id: airline.id } }"
    class="airline-item"
    :style="itemStyle"
  >
    <div class="item__text">
      <span class="airline-item__text__iata text-monospace">{{ airline.iata }}</span>
      <span class="airline-item__text__name">{{ airline.name }}</span>
    </div>
    <div class="airline-item__badges">
      <b-badge
        class="airline-item__badges__badge"
        :style="badgeStyle"
        v-for="service in services"
        :key="service.key"
      >
        <font-awesome-icon :icon="service.icon" />
      </b-badge>
    </div>
  </b-list-group-item>
</template>

<script>
import Color from 'color';
import services from '@/assets/js/services';

export default {
  props: {
    airline: {
      type: Object,
      mandatory: true,
    },
  },
  computed: {
    itemStyle() {
      const primaryColor = Color(this.airline.primary_color);
      const secondaryColor = Color(this.airline.secondary_color);
      return {
        backgroundColor: primaryColor.hex(),
        color: secondaryColor.hex(),
      };
    },
    badgeStyle() {
      const secondaryColor = Color(this.airline.secondary_color);
      return {
        backgroundColor: secondaryColor.hex(),
        color: secondaryColor.isDark() ? 'white' : 'black',
      };
    },
    services() {
      return this.airline.services.map(service => services[service]);
    },
  },
};
</script>

<style lang="scss">
.airline-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &__text {
    &__iata {
      margin-left: -20px;
      padding: 0 20px;
      font-weight: bold;
    }
    &__name {
    }
  }
  &__badges {
    &__badge {
      margin: 0 4px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &:not(:hover) {
    color: black !important;
    background-color: white !important;
    .airline-item {
      &__badges {
        &__badge {
          color: white !important;
          background-color: #6c757d !important;
        }
      }
    }
  }
}
</style>
