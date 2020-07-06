import { ContextType } from "../../libs/ContextType";
import { v4 } from 'uuid';
import passwordHash from 'password-hash';

const UserCreate = async (_: any, { data: { first_name, last_name, email, password, provider } }: any, ctx: ContextType) => {
  const knex = await ctx.knex
  const token = v4().toString() + "-" + new Date().getTime();
  const expires = new Date().setDate(new Date().getDate() + 1);
  await knex('users').insert({
    display_name: first_name + " " + last_name,
    email,
    password: passwordHash.generate(password),
    expire_token: new Date(expires),
    token,
    provider
  })
  return true;
}

const UserLogin = async (_: any, { email, password }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  const token = v4().toString() + "-" + new Date().getTime();
  const expires = new Date().setDate(new Date().getDate() + 1);

  const user = await knex('users').where({ email }).first();

  if(passwordHash.verify(password, user.password)) {
    await knex('users').update({ token, expire_token: new Date(expires) }).where({id: user.id});
    return token;
  }

  return;
}

const me = async (_: any, {}: any, ctx: ContextType) => {
  const user = await ctx.user.getUser();

  return user;
}

export const UserResolver = {
  Query: {
    _gql: () => 'graphql',
    me
  },
  Mutation: {
    UserCreate,
    UserLogin
  }
}