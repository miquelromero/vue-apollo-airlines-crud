<template>
  <b-list-group-item
    :to="{ name: 'airlines-edit', params: { id: airline.id } }"
    class="airline-item"
    :style="itemStyle"
  >
    <span>{{ text }}</span>
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
    text() {
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &__text {
  }
  &__badges {
    &__badge {
      margin: 0 4px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &:hover {
    filter: brightness(1.2);
  }
}
</style>
