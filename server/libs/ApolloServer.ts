import { ApolloServer } from 'apollo-server';
import { LoadSchema } from './LoadSchema';
import { UserResolver } from '../graphql/resolver/UserResolver';
import { context } from './ContextType';
import 'apollo-cache-control';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { MemcachedCache } from 'apollo-server-cache-memcached';
import { getPubSub } from './PubHub';

const pubsub = getPubSub();

const resolvers = {
  Subscription: {
    trigger: {
      subscribe: () => pubsub.asyncIterator(['TRIGGER'])
    }
  },
  ...UserResolver
}

export const server = new ApolloServer({
  typeDefs: LoadSchema(),
  resolvers,
  subscriptions: { path: '/' },
  context,
  cacheControl: {
    defaultMaxAge: 10,
    calculateHttpHeaders: false
  },
  plugins: [responseCachePlugin()],
  persistedQueries: {
    cache: new MemcachedCache(
      ['memcached-1.local', 'memcached-2.local', 'memcached-3.local'],
      { retries: 10, retry: 10000 }
    ),
    ttl: 900
  },
  playground: {
    settings: {
      'editor.theme': 'light'
    }
  }
});