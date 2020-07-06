import { ApolloServer } from 'apollo-server';
import { LoadSchema } from './LoadSchema';
import { UserResolver } from '../graphql/resolver/UserResolver';
import { context } from './ContextType';

const resolvers = {
  ...UserResolver
}

export const server = new ApolloServer({
  typeDefs: LoadSchema(),
  resolvers,
  context
});