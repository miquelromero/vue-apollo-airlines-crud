<template>
  <ApolloQuery :query="require('../graphql/Airlines.gql')">
    <ApolloSubscribeToMore
      :document="require('../graphql/AirlineAdded.gql')"
      :update-query="onAirlineAdded"
    />
    <template slot-scope="{ result: { loading, error, data } }">
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">An error occured</div>
      <b-list-group v-else-if="data">
        <airlines-item v-for="airline in data.airlines" :key="airline.id" :airline="airline" />
      </b-list-group>
    </template>
  </ApolloQuery>
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
  methods: {
    onAirlineAdded(previousResult, { subscriptionData }) {
      return {
        airlines: [...previousResult.airlines, subscriptionData.data.airlineAdded],
      };
    },
  },
};
</script>

<style></style>
