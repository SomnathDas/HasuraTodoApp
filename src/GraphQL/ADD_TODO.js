import { gql } from "@apollo/client";

const ADD_TODO = gql`
  mutation ($todo: String!, $isPublic: Boolean!) {
    insert_todos(objects: { title: $todo, is_public: $isPublic }) {
      affected_rows

      returning {
        id

        title

        created_at

        is_completed
      }
    }
  }
`;

export default ADD_TODO;
