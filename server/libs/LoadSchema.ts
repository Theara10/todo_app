import fs from 'fs';
import { gql } from 'apollo-server';

export function LoadSchema(){
  const files: any[] = [];

  const dir = fs.readdirSync( __dirname + '/../graphql/schema/');

  for(const file of dir) {
    files.push(gql`${fs.readFileSync(__dirname + '/../graphql/schema/' + file)}`);
  }

  return files;
}