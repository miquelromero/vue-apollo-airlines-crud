import shortid from 'shortid';

export default {
  Query: {
    airlines: (root, args, { db }) => db.get('airlines').value(),
    airline: (root, { id }, { db }) =>
      db
        .get('airlines')
        .find({ id })
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
        .find({ id })
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
  },
  Subscription: {
    airlineAdded: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('airlineAdded'),
    },
    airlineUpdated: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('airlineUpdated'),
    },
  },
};
