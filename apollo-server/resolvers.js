import shortid from 'shortid';

export default {
  Query: {
    airlines: (root, args, { db }) =>
      db
        .get('airlines')
        .filter({ active: true })
        .value(),
    airline: (root, { id }, { db }) =>
      db
        .get('airlines')
        .find({ id, active: true })
        .value(),
  },
  Mutation: {
    createAirline: (root, { input }, { pubsub, db }) => {
      const airline = {
        id: shortid.generate(),
        iata: input.iata,
        name: input.name,
        primary_color: input.primary_color,
        secondary_color: input.secondary_color,
        services: input.services,
        active: true,
      };

      db.get('airlines')
        .push(airline)
        .last()
        .write();

      pubsub.publish('airlineAdded', { airlineAdded: airline });

      return airline;
    },
    updateAirline: (root, { id, input }, { pubsub, db }) => {
      const airline = db
        .get('airlines')
        .find({ id, active: true })
        .assign({
          iata: input.iata,
          name: input.name,
          primary_color: input.primary_color,
          secondary_color: input.secondary_color,
          services: input.services,
        })
        .write();

      pubsub.publish('airlineUpdated', { airlineUpdated: airline });

      return airline;
    },
    deleteAirline: (root, { id }, { pubsub, db }) => {
      const airline = db.get('airlines').find({ id, active: true });

      if (!airline) {
        return false;
      }

      airline
        .assign({
          active: false,
        })
        .write();

      pubsub.publish('airlineDeleted', { airlineDeleted: id });

      return true;
    },
  },
  Subscription: {
    airlineAdded: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('airlineAdded'),
    },
    airlineUpdated: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('airlineUpdated'),
    },
    airlineDeleted: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('airlineDeleted'),
    },
  },
};
