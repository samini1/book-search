const { AuthenticationError } = require('apollo-server-express')
const { User } = require('../models');

const resolvers = {
    Query: {
      helloWorld: () => {
        return 'Hello world!';
      }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);

            return user;
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPW = await user.isCorrectPassword(password);

            if (!correctPW) {
                throw new AuthenticationError('Incorrect credentials');
            }

            return user;
        }
    }
  };

  module.exports = resolvers;