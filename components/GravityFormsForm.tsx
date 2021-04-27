import { useMutation, gql } from "@apollo/client";
import { useState } from "react";

import GravityFormsField from "./GravityFormsField";

export const GET_FORM = gql`
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

const SUBMIT_FORM = gql`
  mutation submitForm($formId: Int!, $fieldValues: [FieldValuesInput]) {
    submitGravityFormsForm(input: {
      formId: $formId
      fieldValues: $fieldValues
    }) {
      entryId
    }
  }
`;

interface Props {
  form: any;
  onSuccess?: () => void;
}

export default function GravityFormsForm({ form, onSuccess }: Props) {
  const [submitForm, { data, loading, error }] = useMutation(SUBMIT_FORM);
  const wasSuccessfullySubmitted = Boolean(data?.submitGravityFormsForm);
  const defaultConfirmation = form.confirmations.find(confirmation => confirmation?.isDefault)
  const [fieldValues, setFieldValues] = useState([]);
  console.table(fieldValues);

  function handleSubmit(event) {
    event.preventDefault();

    submitForm({
      variables: {
        formId: form.formId,
        fieldValues: [
          {
            id: 1,
            value: "ONEEE",
          },
          {
            id: 2,
            emailValues: { value: "TWOOO@example.com" },
          }
        ],
      }
    });
  }

  if (wasSuccessfullySubmitted) {
    return <p>{defaultConfirmation?.message || 'Form successfully submitted - thank you.'}</p>
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      {form.fields.nodes.map((field: any) =>
        <GravityFormsField key={field.id} field={field} fieldValues={fieldValues} setFieldValues={setFieldValues} />
      )}
      {error ? (
        <p style={{ color: 'red' }}>{error.message}</p>
      ) : null}
      <button type="submit" disabled={loading}>
        {form.button.text}
      </button>
    </form>
  );
}
