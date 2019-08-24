<template>
  <div>
    <b-button :to="{ name: 'airlines-create' }">{{ $t('crud.createButton') }}</b-button>
    <airlines-list />
    <ApolloMutation
      v-if="isCreating"
      :mutation="require('../graphql/CreateAirline.gql')"
      :variables="{
        input: creationFormData,
      }"
      @done="closeModal"
    >
      <template slot-scope="{ mutate }">
        <b-modal @hidden="closeModal" :visible="isCreating" :title="$t('crud.modalCreateTitle')">
          <airlines-form @change="creationFormData = $event" />
          <template #modal-footer>
            <b-button variant="primary" @click="mutate">{{ $t('crud.createButton') }}</b-button>
          </template>
        </b-modal>
      </template>
    </ApolloMutation>
    <b-modal
      v-if="isEditing"
      @hidden="closeModal"
      :visible="isEditing"
      :title="$t('crud.modalEditTitle')"
    >
      <airlines-form @change="editionFormData = $event" />
    </b-modal>
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
      creationFormData: {},
      editionFormData: {},
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
    id: {
      type: String,
    },
  },
  methods: {
    closeModal() {
      this.$router.push({ name: 'airlines' });
    },
  },
};
</script>
