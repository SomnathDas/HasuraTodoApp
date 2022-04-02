import { gql } from "@apollo/client";

const SUBSCRIBE_MY_TODOS = gql`
  subscription {
    todos(order_by: { created_at: desc }) {
      id
      title
      is_completed
      created_at
    }
  }
`;

export default SUBSCRIBE_MY_TODOS;
