<template>
  <b-list-group>
    <airlines-item v-for="airline in airlines" :key="airline.id" :airline="airline" />
  </b-list-group>
</template>

<script>
import AirlinesItem from '@/components/AirlinesItem.vue';

export default {
  components: {
    AirlinesItem,
  },
  data() {
    return {};
  },
  props: {
    airlines: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
