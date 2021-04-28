import { gql } from "@apollo/client";

import { SelectField as SelectFieldType } from "../../generated/graphql";
import useGravityForm, { ACTION_TYPES, StringFieldValue } from "../../hooks/useGravityForm";

export const SELECT_FIELD_FIELDS = gql`
  fragment SelectFieldFields on SelectField {
    id
    formId
    label
    isRequired
    defaultValue
    choices {
      text
      value
    }
  }
`;

interface Props {
  field: SelectFieldType;
}

export default function SelectField({ field }: Props) {
  const { id, formId, label, isRequired, defaultValue, choices } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: StringFieldValue) => fieldValue.id === id);
  const value = fieldValue?.value || defaultValue;
  console.log({ value });

  return (
    <>
      <label htmlFor={htmlId}>{label}</label>
      <select
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        value={value}
        onChange={event => {
          dispatch({
            type: ACTION_TYPES.updateSelectFieldValue,
            fieldValue: {
              id,
              value: event.target.value,
            },
          })
        }}
      >
        {choices?.map(choice =>
          <option value={choice?.value || ''}>{choice?.text || ''}</option>
        )}
      </select>
    </>
  );
}
