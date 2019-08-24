<template>
  <div>
    <airlines-list />
  </div>
</template>

<script>
import AirlinesList from '@/components/AirlinesList.vue';

export default {
  name: 'home',
  components: {
    AirlinesList,
  },
};
</script>
