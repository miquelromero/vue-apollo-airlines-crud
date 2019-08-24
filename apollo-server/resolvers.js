import shortid from 'shortid';

export default {
  Query: {
    airlines: (root, args, { db }) => db.get('airlines').value(),
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

      pubsub.publish('airlines', { airlineAdded: airline });

      return airline;
    },
  },
  Subscription: {
    airlineAdded: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('airlines'),
    },
  },
};
