const { AuthenticationError } = require('apollo-server-express')
const { User } = require('../models');
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
     me: async (parent, args, context) => {
         if (context.user) {
             return User.findOne({_id: context.user._id });
         }
         throw new AuthenticationError('Not logged in')
     }
    },
    Mutation: {
        addUser: async (parent, {username, email, password }) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);

            return {token, user} ;
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
            
            const token = signToken(user);
            return {token, user};
        },
        saveBook: async (parent, {book}, context) => {
            if (context.user){
                const userUp = await User.findOneAndUpdate(
                    {_id: context.user.id},
                    { $addToSet: {savedBooks: book}},
                    { new:true }
                )
                return userUp;
            }
            throw new AuthenticationError('You need to be logged in')

        },
        removeBook: async (parent, {bookId}, context) => {
            if (context.user) {
                const userUp = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $pull: {savedBooks: {bookId: bookId}}},
                    {new:true }
                )
                return userUp;
            }
        }
    }
  };

  module.exports = resolvers;