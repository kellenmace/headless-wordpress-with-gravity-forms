import { gql } from "@apollo/client";

import { TextAreaField as TextAreaFieldType } from "../../generated/graphql";
import useGravityForm, { ACTION_TYPES, StringFieldValue } from "../../hooks/useGravityForm";

export const TEXT_AREA_FIELD_FIELDS = gql`
  fragment TextAreaFieldFields on TextAreaField {
    id
    formId
    label
    isRequired
  }
`;

interface Props {
  field: TextAreaFieldType;
}

const DEFAULT_VALUE = '';

export default function TextAreaField({ field }: Props) {
  const { id, formId, label, isRequired } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: StringFieldValue) => fieldValue.id === id);
  const value = fieldValue?.value || DEFAULT_VALUE;

  return (
    <>
      <label htmlFor={htmlId}>{label}</label>
      <textarea
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        value={value}
        onChange={event => {
          dispatch({
            type: ACTION_TYPES.updateTextAreaFieldValue,
            fieldValue: {
              id,
              value: event.target.value,
            },
          })
        }}
      />
    </>
  );
}
