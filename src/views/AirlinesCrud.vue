<template>
  <div>
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
        <div v-if="loading || isLoading" class="text-center mt-3">
          <b-spinner />
        </div>
        <b-alert :show="!!error" class="mt-3" variant="danger">
          {{ $t('errors.generic') }}
        </b-alert>
        <airlines-list v-if="data && data.airlines" :airlines="data.airlines" />
      </template>
    </ApolloQuery>
    <b-modal
      v-if="isCreating"
      @hidden="closeModal"
      :visible="isCreating"
      :title="$t('crud.modalCreateTitle')"
    >
      <airlines-form @change="formData = $event" @validate="validFormData = $event" />
      <template #modal-footer>
        <ApolloMutation
          v-if="isCreating"
          :mutation="require('../graphql/CreateAirline.gql')"
          :variables="{
            input: formData,
          }"
          @done="onSuccess('create')"
          @error="onError('create')"
        >
          <template slot-scope="{ mutate, loading }">
            <b-button
              variant="primary"
              :disabled="!validFormData || loading"
              @click="mutate"
              v-text="$t('crud.createButton')"
            />
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
          <airlines-form
            v-if="data && data.airline"
            :item="data.airline"
            @change="formData = $event"
            @validate="validFormData = $event"
          />
          <template #modal-footer>
            <ApolloMutation
              :mutation="require('../graphql/DeleteAirline.gql')"
              :variables="{
                id: $route.params.id,
                input: formData,
              }"
              @done="onSuccess('delete')"
              @error="onError('delete')"
            >
              <template slot-scope="{ mutate, loading }">
                <b-button
                  :disabled="!data || !data.airline || loading"
                  variant="danger"
                  @click="mutate"
                  v-text="$t('crud.deleteButton')"
                />
              </template>
            </ApolloMutation>
            <ApolloMutation
              :mutation="require('../graphql/UpdateAirline.gql')"
              :variables="{
                id: $route.params.id,
                input: formData,
              }"
              @done="onSuccess('update')"
              @error="onError('update')"
            >
              <template slot-scope="{ mutate, loading }">
                <b-button
                  variant="primary"
                  @click="mutate"
                  :disabled="!validFormData || loading"
                  v-text="$t('crud.updateButton')"
                />
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
      validFormData: undefined,
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
    onError(action) {
      this.$bvToast.toast(this.$t(`crud.errorToast.text.${action}`), {
        title: this.$t('crud.errorToast.title'),
        toaster: 'b-toaster-bottom-center',
        variant: 'danger',
        solid: true,
      });
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
