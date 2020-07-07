import { ApolloServer, PubSub } from 'apollo-server';
import { LoadSchema } from './LoadSchema';
import { UserResolver } from '../graphql/resolver/UserResolver';
import { context } from './ContextType';
import 'apollo-cache-control';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { MemcachedCache } from 'apollo-server-cache-memcached';
import { TodoResolver } from '../graphql/resolver/TodoResolver';

const resolvers = {
  ...UserResolver,
  ...TodoResolver
}

export const server = new ApolloServer({
  typeDefs: LoadSchema(),
  resolvers,
  context,
  tracing: true,
  introspection: true,
  subscriptions: {
    onConnect: (connection: any, webSocket) => {
      console.log('socket connected');
      return true;
    }
  },
  playground: {
    settings: {
      'editor.theme': 'dark',
      'editor.fontSize': 11,
      'editor.fontFamily': "'ubuntu', 'monospace', 'Fira Code'"
    }
  }
  // cacheControl: {
  //   defaultMaxAge: 10,
  //   calculateHttpHeaders: false
  // },
  // plugins: [responseCachePlugin()],
  // persistedQueries: {
  //   cache: new MemcachedCache(
  //     ['memcached-1.local', 'memcached-2.local', 'memcached-3.local'],
  //     { retries: 10, retry: 10000 }
  //   ),
  //   ttl: 900
  // }, "'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace"
});