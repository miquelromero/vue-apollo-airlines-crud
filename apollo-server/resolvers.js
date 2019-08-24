export default {
  Query: {
    airlines: (root, args, { db }) => db.get('airlines').value(),
  },
};
