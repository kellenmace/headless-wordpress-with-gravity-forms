import { gql } from "@apollo/client";

import { client } from "../services/apollo";
import { CHECKBOX_FIELD_FIELDS } from "../components/GravityFormsFields/CheckboxField";
import { EMAIL_FIELD_FIELDS } from "../components/GravityFormsFields/EmailField";
import { MULTI_SELECT_FIELD_FIELDS } from "../components/GravityFormsFields/MultiSelectField";
import { SELECT_FIELD_FIELDS } from "../components/GravityFormsFields/SelectField";
import { TEXT_AREA_FIELD_FIELDS } from "../components/GravityFormsFields/TextAreaField";
import { TEXT_FIELD_FIELDS } from "../components/GravityFormsFields/TextField";
import { WEBSITE_FIELD_FIELDS } from "../components/GravityFormsFields/WebsiteField";

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
          id
          type
          ... on CheckboxField {
            ...CheckboxFieldFields
          }
          ... on EmailField {
            ...EmailFieldFields
          }
          ... on MultiSelectField {
            ...MultiSelectFieldFields
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
          ... on WebsiteField {
            ...WebsiteFieldFields
          }
        }
      }
    }
  }
  ${CHECKBOX_FIELD_FIELDS}
  ${EMAIL_FIELD_FIELDS}
  ${MULTI_SELECT_FIELD_FIELDS}
  ${SELECT_FIELD_FIELDS}
  ${TEXT_AREA_FIELD_FIELDS}
  ${TEXT_FIELD_FIELDS}
  ${WEBSITE_FIELD_FIELDS}
`;

export default async function getGravityForm(formId: number): Promise<any> {
  const result = await client
    .query({
      query: GET_FORM,
      variables: { formId },
    });

  return result?.data?.gravityFormsForm || null;
}
