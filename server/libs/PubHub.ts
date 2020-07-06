import { PubSub } from "graphql-subscriptions";

const pub = new PubSub();

export function getPubSub(){
  return pub;
}