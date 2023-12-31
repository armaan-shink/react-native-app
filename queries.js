/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      firstname
      lastname
      gender
      age
      profileImage {
        bucket
        region
        key
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstname
        lastname
        gender
        age
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
