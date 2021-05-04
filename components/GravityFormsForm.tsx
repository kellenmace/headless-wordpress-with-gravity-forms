import { useMutation, gql } from "@apollo/client";

import { GravityFormsForm as GravityFormsFormType, FormField, FieldError } from "../generated/graphql";
import useGravityForm from "../hooks/useGravityForm";
import GravityFormsField from "./GravityFormsField";

const SUBMIT_FORM = gql`
  mutation submitForm($formId: Int!, $fieldValues: [FieldValuesInput]) {
    submitGravityFormsForm(input: {
      formId: $formId
      fieldValues: $fieldValues
    }) {
      entryId
      errors {
        id
        message
      }
    }
  }
`;

interface Props {
  form: GravityFormsFormType;
}

export default function GravityFormsForm({ form }: Props) {
  const [submitForm, { data, loading, error }] = useMutation(SUBMIT_FORM);
  const haveEntryId = Boolean(data?.submitGravityFormsForm?.entryId);
  const haveFieldErrors = Boolean(data?.submitGravityFormsForm?.errors?.length);
  const wasSuccessfullySubmitted = haveEntryId && !haveFieldErrors;
  const defaultConfirmation = form.confirmations?.find(confirmation => confirmation?.isDefault);
  const formFields = form.formFields?.nodes || [];
  const { state } = useGravityForm();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    submitForm({
      variables: {
        formId: form.formId,
        fieldValues: state,
      }
    }).catch(error => {
      console.error(error);
    })
  }

  function getFieldErrors(id: number): FieldError[] {
    if (!haveFieldErrors) return [];
    return data.submitGravityFormsForm.errors.filter((error: FieldError) => error.id === id);
  }

  if (wasSuccessfullySubmitted) {
    return <p>{defaultConfirmation?.message || 'Form successfully submitted - thank you.'}</p>
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      {formFields.map(field =>
        <GravityFormsField
          key={field?.id}
          field={field as FormField}
          fieldErrors={getFieldErrors(Number(field?.id))}
        />
      )}
      {error ? (
        <p className="error-message">{error.message}</p>
      ) : null}
      <button type="submit" disabled={loading}>
        {form?.button?.text || 'Submit'}
      </button>
    </form>
  );
}
