import { useMutation, gql } from "@apollo/client";
import { SyntheticEvent } from "react";

import { GravityFormsForm as GravityFormsFormType, FormField } from "../generated/graphql";
import useGravityForm from "../hooks/useGravityForm";
import GravityFormsField from "./GravityFormsField";

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
  form: GravityFormsFormType;
}

export default function GravityFormsForm({ form }: Props) {
  const [submitForm, { data, loading, error }] = useMutation(SUBMIT_FORM);
  const wasSuccessfullySubmitted = Boolean(data?.submitGravityFormsForm);
  const defaultConfirmation = form.confirmations?.find(confirmation => confirmation?.isDefault);
  const formFields = form.fields?.nodes || [];
  const { state } = useGravityForm();

  console.table(state);

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    if (loading) return;

    submitForm({
      variables: {
        formId: form.formId,
        fieldValues: state,
      }
    });
  }

  if (wasSuccessfullySubmitted) {
    return <p>{defaultConfirmation?.message || 'Form successfully submitted - thank you.'}</p>
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      {formFields.map(field =>
        <GravityFormsField key={field?.id} field={field as FormField} />
      )}
      {error ? (
        <p style={{ color: 'red' }}>{error.message}</p>
      ) : null}
      <button type="submit" disabled={loading}>
        {form?.button?.text || 'Submit'}
      </button>
    </form>
  );
}
