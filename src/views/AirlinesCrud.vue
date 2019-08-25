<template>
  <div>
    <b-button :to="{ name: 'airlines-create' }">{{ $t('crud.createButton') }}</b-button>
    <ApolloQuery :query="require('../graphql/Airlines.gql')">
      <ApolloSubscribeToMore
        :document="require('../graphql/AirlineAdded.gql')"
        :update-query="onAirlineAdded"
      />
      <ApolloSubscribeToMore
        :document="require('../graphql/AirlineDeleted.gql')"
        :update-query="onAirlineDeleted"
      />
      <ApolloSubscribeToMore :document="require('../graphql/AirlineUpdated.gql')" />
      <!-- TODO: Use loading instead of isLoading once issue is fixed 
           https://github.com/Akryum/vue-apollo/issues/263 
      -->
      <template slot-scope="{ result: { loading, error, data }, isLoading }">
        <div v-if="loading || isLoading" class="text-center">
          <b-spinner label="Spinning"></b-spinner>
        </div>
        <div v-else-if="error">An error occured</div>
        <airlines-list v-else-if="data" :airlines="data.airlines" />
      </template>
    </ApolloQuery>
    <b-modal
      v-if="isCreating"
      @hidden="closeModal"
      :visible="isCreating"
      :title="$t('crud.modalCreateTitle')"
    >
      <airlines-form @change="formData = $event" />
      <template #modal-footer>
        <ApolloMutation
          v-if="isCreating"
          :mutation="require('../graphql/CreateAirline.gql')"
          :variables="{
            input: formData,
          }"
          @done="onSuccess('create')"
        >
          <template slot-scope="{ mutate }">
            <b-button variant="primary" @click="mutate">{{ $t('crud.createButton') }}</b-button>
          </template>
        </ApolloMutation>
      </template>
    </b-modal>
    <ApolloQuery
      v-if="isEditing"
      :query="require('../graphql/Airline.gql')"
      :variables="{
        id: $route.params.id,
      }"
    >
      <!-- TODO: Use loading instead of isLoading once issue is fixed 
           https://github.com/Akryum/vue-apollo/issues/263 
      -->
      <template slot-scope="{ result: { loading, error, data }, isLoading }">
        <b-modal @hidden="closeModal" :visible="isEditing" :title="$t('crud.modalEditTitle')">
          <div v-if="loading || isLoading" class="text-center">
            <b-spinner label="Spinning"></b-spinner>
          </div>
          <div v-else-if="error">An error occured</div>
          <airlines-form v-else-if="data" :item="data.airline" @change="formData = $event" />
          <template #modal-footer>
            <ApolloMutation
              :mutation="require('../graphql/DeleteAirline.gql')"
              :variables="{
                id: $route.params.id,
                input: formData,
              }"
              @done="onSuccess('delete')"
            >
              <template slot-scope="{ mutate }">
                <b-button variant="danger" @click="mutate">{{ $t('crud.deleteButton') }}</b-button>
              </template>
            </ApolloMutation>
            <ApolloMutation
              :mutation="require('../graphql/UpdateAirline.gql')"
              :variables="{
                id: $route.params.id,
                input: formData,
              }"
              @done="onSuccess('update')"
            >
              <template slot-scope="{ mutate }">
                <b-button variant="primary" @click="mutate">{{ $t('crud.editButton') }}</b-button>
              </template>
            </ApolloMutation>
          </template>
        </b-modal>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import AirlinesList from '@/components/AirlinesList.vue';
import AirlinesForm from '@/components/AirlinesForm.vue';

export default {
  components: {
    AirlinesList,
    AirlinesForm,
  },
  data() {
    return {
      formData: {},
    };
  },
  props: {
    isCreating: {
      type: Boolean,
      default: false,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$router.push({ name: 'airlines' });
    },
    onSuccess(action) {
      this.$bvToast.toast(this.$t(`crud.successToast.text.${action}`), {
        title: this.$t('crud.successToast.title'),
        toaster: 'b-toaster-bottom-center',
        variant: 'success',
        solid: true,
      });
      this.closeModal();
    },
    onAirlineAdded(previousResult, { subscriptionData }) {
      return {
        airlines: [...previousResult.airlines, subscriptionData.data.airlineAdded],
      };
    },
    onAirlineDeleted(previousResult, { subscriptionData }) {
      return {
        airlines: previousResult.airlines.filter(
          airline => airline.id !== subscriptionData.data.airlineDeleted,
        ),
      };
    },
  },
};
</script>
