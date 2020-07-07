import { ContextType } from "../../libs/ContextType";
import { v4 } from 'uuid';
import passwordHash from 'password-hash';
import pubsub from '../../libs/PubSub';
import { withFilter } from 'apollo-server';

const UserCreate = async (_: any, { data: { first_name, last_name, email, password, provider, url_photo } }: any, ctx: ContextType) => {
  const knex = await ctx.knex
  const token = v4().toString() + "-" + new Date().getTime();
  const expires = new Date().setDate(new Date().getDate() + 1);
  await knex('users').insert({
    display_name: first_name + " " + last_name,
    email,
    password: passwordHash.generate(password),
    expire_token: new Date(expires),
    token,
    provider,
    url_photo
  })
  return true;
}

const UserLogin = async (_: any, { email, password }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  const token = v4().toString() + "-" + new Date().getTime();
  const expires = new Date().setDate(new Date().getDate() + 1);

  const user = await knex('users').where({ email }).first();

  if(passwordHash.verify(password, user.password)) {
    await knex('users').update({ token, expire_token: new Date(expires), updated_at: Date.now() }).where({id: user.id});
    return token;
  }

  return;
}

const me = async (_: any, {}: any, ctx: ContextType, info: any) => {
  info.cacheControl.setCacheHint({ maxAge: 60, scope: 'PRIVATE' });
  const user = await ctx.user.getUser();
  return user;
}

const A = 'A1';

export const UserResolver = {
  Subscription: {
    triggerSubscript: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(A),
        () => true
      )
    }
  },
  Query: {
    _gql: () => 'graphql',
    me
  },
  Mutation: {
    UserCreate,
    UserLogin,
    Add: async (_: any, {data}: any, ctx: ContextType) => {
      pubsub.publish(A, { triggerSubscript: { data, created: new Date() + "" } })
      return true;
    }
  }
}