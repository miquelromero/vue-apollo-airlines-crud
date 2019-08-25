<template>
  <div>
    <ApolloQuery :query="gql.queries.items">
      <ApolloSubscribeToMore :document="gql.subscriptions.added" :update-query="onItemAdded" />
      <ApolloSubscribeToMore :document="gql.subscriptions.deleted" :update-query="onItemDeleted" />
      <ApolloSubscribeToMore :document="gql.subscriptions.updated" />
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
        <component :is="listComponent" v-if="data && data[keys.items]" :items="data[keys.items]" />
      </template>
    </ApolloQuery>
    <b-modal
      v-if="isCreating"
      @hidden="closeModal"
      :visible="isCreating"
      :title="$t('crud.modalCreateTitle')"
    >
      <div data-cy="generic-crud-form-create-modal">
        <component
          :is="formComponent"
          @change="formData = $event"
          @validate="validFormData = $event"
        />
      </div>
      <template #modal-footer>
        <ApolloMutation
          v-if="isCreating"
          :mutation="gql.mutations.create"
          :variables="{
            input: formData,
          }"
          @done="onSuccess('create')"
          @error="onError('create')"
        >
          <template slot-scope="{ mutate, loading }">
            <b-button
              data-cy="generic-crud-form-create-button"
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
      :query="gql.queries.item"
      :variables="{
        id: $route.params.id,
      }"
    >
      <!-- TODO: Use loading instead of isLoading once issue is fixed 
           https://github.com/Akryum/vue-apollo/issues/263 
      -->
      <template slot-scope="{ result: { loading, error, data }, isLoading }">
        <b-modal @hidden="closeModal" :visible="isEditing" :title="$t('crud.modalEditTitle')">
          <div data-cy="generic-crud-form-edit-modal">
            <div v-if="loading || isLoading" class="text-center">
              <b-spinner />
            </div>
            <component
              :is="formComponent"
              v-if="data && data[keys.item]"
              :item="data[keys.item]"
              @change="formData = $event"
              @validate="validFormData = $event"
            />
          </div>
          <template #modal-footer>
            <ApolloMutation
              :mutation="gql.mutations.delete"
              :variables="{
                id: $route.params.id,
                input: formData,
              }"
              @done="onSuccess('delete')"
              @error="onError('delete')"
            >
              <template slot-scope="{ mutate, loading }">
                <b-button
                  data-cy="generic-crud-form-delete-button"
                  :disabled="!data || !data[keys.item] || loading"
                  variant="danger"
                  @click="mutate"
                  v-text="$t('crud.deleteButton')"
                />
              </template>
            </ApolloMutation>
            <ApolloMutation
              :mutation="gql.mutations.update"
              :variables="{
                id: $route.params.id,
                input: formData,
              }"
              @done="onSuccess('update')"
              @error="onError('update')"
            >
              <template slot-scope="{ mutate, loading }">
                <b-button
                  data-cy="generic-crud-form-edit-button"
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
export default {
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
    gql: {
      type: Object,
      mandatory: true,
    },
    keys: {
      type: Object,
      mandatory: true,
    },
    listComponent: {
      type: Object,
      mandatory: true,
    },
    formComponent: {
      type: Object,
      mandatory: true,
    },
  },
  methods: {
    closeModal() {
      this.$router.push({ name: this.keys.items });
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
    onItemAdded(previousResult, { subscriptionData }) {
      return {
        [this.keys.items]: [
          ...previousResult[this.keys.items],
          subscriptionData.data[this.keys.added],
        ],
      };
    },
    onItemDeleted(previousResult, { subscriptionData }) {
      return {
        [this.keys.items]: previousResult[this.keys.items].filter(
          item => item.id !== subscriptionData.data[this.keys.deleted],
        ),
      };
    },
  },
};
</script>
