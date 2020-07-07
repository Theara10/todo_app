import { server } from './libs/ApolloServer';

server.listen(4000).then(({url, subscriptionsUrl}) => {
  console.log(`server listen on port ${url}`);
  console.log(`server subscription listen on port ${subscriptionsUrl}`);
});