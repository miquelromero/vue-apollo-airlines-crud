<template>
  <generic-crud
    :gql="gql"
    :keys="keys"
    :is-creating="isCreating"
    :is-editing="isEditing"
    :list-component="listComponent"
    :form-component="formComponent"
  ></generic-crud>
</template>

<script>
import GenericCrud from '@/components/GenericCrud.vue';
import Airlines from '@/graphql/airlines/Airlines.gql';
import Airline from '@/graphql/airlines/Airline.gql';
import CreateAirline from '@/graphql/airlines/CreateAirline.gql';
import UpdateAirline from '@/graphql/airlines/UpdateAirline.gql';
import DeleteAirline from '@/graphql/airlines/DeleteAirline.gql';
import AirlineAdded from '@/graphql/airlines/AirlineAdded.gql';
import AirlineDeleted from '@/graphql/airlines/AirlineDeleted.gql';
import AirlineUpdated from '@/graphql/airlines/AirlineUpdated.gql';
import AirlinesList from '@/components/airlines/AirlinesList.vue';
import AirlinesForm from '@/components/airlines/AirlinesForm.vue';

export default {
  data() {
    return {
      gql: {
        queries: {
          items: Airlines,
          item: Airline,
        },
        mutations: {
          create: CreateAirline,
          update: UpdateAirline,
          delete: DeleteAirline,
        },
        subscriptions: {
          added: AirlineAdded,
          deleted: AirlineDeleted,
          updated: AirlineUpdated,
        },
      },
      keys: {
        item: 'airline',
        items: 'airlines',
        added: 'airlineAdded',
        deleted: 'airlineDeleted',
      },
      formComponent: AirlinesForm,
      listComponent: AirlinesList,
    };
  },
  components: {
    GenericCrud,
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
};
</script>
