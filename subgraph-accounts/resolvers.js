const {AuthenticationError, ForbiddenError} = require('./utils/errors');

const resolvers = {
    Query: {
        user: async (_, {id}, {dataSources}) => {
            const user = await dataSources.accountsAPI.getUser(id);
            if (!user){
                throw new AuthenticationError('No user found for this id');
            }
            return dataSources.accountsAPI.getUser(id);
        },
        me: async (_, __, {dataSources, userId}) => {
            if (!userId) {
                throw new AuthenticationError('You must be logged in');
            }
            const user = await dataSources.accountsAPI.getUser(userId);
            return user;
        }
    },
    Mutation: {
      updateProfile: async (_, {updateProfileInput}, {dataSources, userId}) => {
        if (!userId) {
          throw new AuthenticationError('You must be logged in');
        }
        try {
            const user = await dataSources.accountsAPI.updateUser({userId, userInfo: updateProfileInput});
            return {
                code: 200,
                success: true,
                message: 'Update profile successfully',
                user
            }
        } catch (err) {
            return {
                code: 400,
                success: false,
                message: err.message,
            }
        }
      }
    },
    User: {
        __resolveType(user) {
            console.log('user type +++++++++++++++++', user);
            return user.role;
        }
    },
    Host: {
        __resolveReference(user, {dataSources}) {
            return dataSources.accountsAPI.getUser(user.id);
        }
    },
    Guest: {
        __resolveReference(user, {dataSources}) {
            return dataSources.accountsAPI.getUser(user.id);
        }
    }
};

module.exports = resolvers;
