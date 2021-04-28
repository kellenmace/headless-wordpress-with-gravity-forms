import { gql } from "@apollo/client";

import { client } from "../services/apollo";
import { EMAIL_FIELD_FIELDS } from "../components/GravityFormsFields/EmailField";
import { SELECT_FIELD_FIELDS } from "../components/GravityFormsFields/SelectField";
import { TEXT_AREA_FIELD_FIELDS } from "../components/GravityFormsFields/TextAreaField";
import { TEXT_FIELD_FIELDS } from "../components/GravityFormsFields/TextField";

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
      fields(first: 500) {
        nodes {
          type
          ... on EmailField {
            ...EmailFieldFields
          }
          ... on SelectField {
            ...SelectFieldFields
          }
          ... on TextField {
            ...TextFieldFields
          }
          ... on TextAreaField {
            ...TextAreaFieldFields
          }
        }
      }
    }
  }
  ${EMAIL_FIELD_FIELDS}
  ${SELECT_FIELD_FIELDS}
  ${TEXT_AREA_FIELD_FIELDS}
  ${TEXT_FIELD_FIELDS}
`;

export default async function getGravityForm(formId: number): Promise<any> {
  const result = await client
    .query({
      query: GET_FORM,
      variables: { formId },
    });

  return result?.data?.gravityFormsForm || null;
}
