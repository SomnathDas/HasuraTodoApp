import { gql } from "@apollo/client";

const CLEAR_COMPLETED = gql`
  mutation clearCompleted {
    delete_todos(
      where: { is_completed: { _eq: true }, is_public: { _eq: false } }
    ) {
      affected_rows
    }
  }
`;

export default CLEAR_COMPLETED;
