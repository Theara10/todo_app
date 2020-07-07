import { ContextType } from "../../libs/ContextType";

const todoList = async (_: any, { offset, limit }: any, ctx: ContextType) => {
  const knex = await ctx.knex;

  const todos = await knex("todos")
    .offset(offset)
    .limit(limit)
    .orderBy("created_at", "desc");
  const users = await knex("users").whereIn(
    "id",
    todos.map((t) => t.created_by)
  );

  return todos.map((x) => {
    return {
      ...x,
      user: users.find((u) => u.id === x.created_by),
    };
  });
};

const todoById = async (_: any, { id }: any, ctx: ContextType) => {
  const knex = await ctx.knex;

  const todo = await knex("todos")
    .innerJoin("users", "users.id", "todos.created_by")
    .select("users.id as user_id", '*', 'todos.id as todo_id')
    .where('todos.id', '=', id)
    .first();
  
  return {
    ...todo,
    id: todo.todo_id,
    user: {
      id: todo.user_id,
      display_name: todo.display_name,
      email: todo.email,
    },
  };
};

const todoCreate = async (_: any, { data }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  const user = await ctx.user.getUser();

  if (user === null) return false;

  await knex("todos").insert({ ...data, created_by: user.id });

  return true;
};

const todoEdit = async (_: any, { id, data }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  const user = await ctx.user.getUser();

  if (user === null) return false;

  await knex("todos")
    .update({ ...data, updated_at: Date.now() })
    .where({ id, created_by: user.id });

  return true;
};

const todoRemove = async (_: any, { id }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  const user = await ctx.user.getUser();

  if (user === null) return false;

  await knex("todos").delete().where({ id, created_by: user.id });

  return true;
};

const todoToggleDone = async (_: any, { id }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  const user = await ctx.user.getUser();

  if (user === null) return false;

  const todo = await knex('todos').where({ id }).first();

  await knex('todos').update({ is_done: todo.is_done === 0 ? 1: 0 }).where({id});

  return true;
}

export const TodoResolver = {
  Query: {
    todoList,
    todoById,
  },
  Mutation: {
    todoCreate,
    todoEdit,
    todoRemove,
    todoToggleDone
  },
};
