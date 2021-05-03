import { gql } from "@apollo/client";

import { DateField as DateFieldType } from "../../generated/graphql";
import useGravityForm, { ACTION_TYPES, StringFieldValue } from "../../hooks/useGravityForm";

export const DATE_FIELD_FIELDS = gql`
  fragment DateFieldFields on DateField {
    id
    formId
    label
    isRequired
    placeholder
  }
`;

interface Props {
  field: DateFieldType;
}

const DEFAULT_VALUE = '';

export default function DateField({ field }: Props) {
  const { id, formId, label, isRequired, placeholder } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: StringFieldValue) => fieldValue.id === id);
  const value = fieldValue?.value || DEFAULT_VALUE;

  return (
    <>
      <label htmlFor={htmlId}>{label}</label>
      <input
        type="date"
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        placeholder={placeholder || ''}
        value={value}
        onChange={event => {
          dispatch({
            type: ACTION_TYPES.updateDateFieldValue,
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
