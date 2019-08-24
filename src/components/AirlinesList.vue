<template>
  <b-list-group>
    <airline-item v-for="item in items" :key="item.iata" :airline="item" />
  </b-list-group>
</template>

<script>
import AirlineItem from '@/components/AirlineItem.vue';

export default {
  components: {
    AirlineItem,
  },
  data() {
    return {
      items: [
        {
          iata: 'VY',
          name: 'Vueling',
          primary_color: '#fc0',
          secondary_color: '#666',
          services: [
            {
              key: 'bags',
              value: false,
            },
            {
              key: 'checkin',
              value: true,
            },
            {
              key: 'seats',
              value: true,
            },
          ],
        },
        {
          iata: 'FR',
          name: 'Ryanair',
          primary_color: '#133590',
          secondary_color: '#f1c931',
          services: [
            {
              key: 'bags',
              value: true,
            },
            {
              key: 'checkin',
              value: true,
            },
            {
              key: 'seats',
              value: true,
            },
          ],
        },
      ],
    };
  },
};
</script>

<style></style>
