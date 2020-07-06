import { server } from './libs/ApolloServer';

server.listen(4000).then(({url}) => {
  console.log(`server listen on port ${url}`);
});