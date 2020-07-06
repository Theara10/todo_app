import Knex from 'knex';
import { knex } from './Setting';
import { getPubSub } from './PubHub';
import { PubSub } from 'graphql-subscriptions';

export type ContextType = {
  knex: Knex,
  user: UserHandler,
  pubsub: PubSub
}

export const context = async ({req}: any) => {
  const auth = new UserHandler(req.query.token);
  return {
    knex,
    user: auth,
    pubsub: getPubSub()
  }
}

class UserHandler {
  private token: string;
  
  constructor(token: string){
    this.token = token;
  }

  async getUser(){
    const user = await knex('users').where({token: this.token}).first();
    if(user === undefined) return null;
    if(new Date(user.expire_token).getTime() <= new Date().getTime()) {
      await knex('users').update({ token: null }).where({id: user.id});
      throw 'token was expire';
    }
    return user;
  }
}