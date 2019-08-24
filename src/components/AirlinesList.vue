<template>
  <ApolloQuery :query="require('../graphql/Airlines.gql')">
    <template slot-scope="{ result: { loading, error, data } }">
      <div v-if="loading" class="loading apollo">Loading...</div>
      <div v-else-if="error" class="error apollo">An error occured</div>
      <b-list-group v-else-if="data">
        <airline-item v-for="airline in data.airlines" :key="airline.iata" :airline="airline" />
      </b-list-group>
    </template>
  </ApolloQuery>
</template>

<script>
import AirlineItem from '@/components/AirlineItem.vue';

export default {
  components: {
    AirlineItem,
  },
  data() {
    return {};
  },
};
</script>

<style></style>
