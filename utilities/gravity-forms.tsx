import { gql } from "@apollo/client";

import { client } from "../services/apollo";
// import { textFieldFields } from "../components/GravityFormsFields/TextField";

const GET_FORM = gql`
  query getForm($formId: ID!) {
    gravityFormsForm(id: $formId, idType: DATABASE_ID) {
      formId
      button {
        text
      }
      confirmations {
        isDefault
        message
      }
      fields(first: 100) {
        nodes {
          type
          ... on TextField {
            id
            label
            isRequired
          }
          ... on TextAreaField {
            id
            label
            isRequired
          }
          ... on EmailField {
            id
            label
            isRequired
          }
        }
      }
    }
  }
`;

export default async function getGravityForm(formId: number): Promise<any> {
  const result = await client
    .query({
      query: GET_FORM,
      variables: { formId },
    });

  return result?.data?.gravityFormsForm || null;
}
