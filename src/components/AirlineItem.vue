<template>
  <b-list-group-item class="airline-item" :style="itemStyle">
    <div class="airline-item__header">
      {{ header }}
      <div class="item__header__badges float-right">
        <div
          class="airline-item__header__badges__badge badge"
          :style="badgeStyle"
          v-for="service in services"
          :key="service.key"
        >
          <font-awesome-icon :icon="service.icon" />
        </div>
      </div>
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
    header() {
      return `${this.airline.iata} - ${this.airline.name}`;
    },
    itemStyle() {
      const primaryColor = Color(this.airline.primary_color);
      return {
        backgroundColor: primaryColor.hex(),
        color: primaryColor.isDark() ? 'white' : 'black',
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
  &__header {
    &__badges {
      &__badge {
        margin: 0 4px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
