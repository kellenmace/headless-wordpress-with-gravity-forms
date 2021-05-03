import { gql } from "@apollo/client";

import { PhoneField as PhoneFieldType } from "../../generated/graphql";
import useGravityForm, { ACTION_TYPES, StringFieldValue } from "../../hooks/useGravityForm";

export const PHONE_FIELD_FIELDS = gql`
  fragment PhoneFieldFields on PhoneField {
    id
    formId
    label
    isRequired
    cssClass
    placeholder
  }
`;

interface Props {
  field: PhoneFieldType;
}

const DEFAULT_VALUE = '';

export default function PhoneField({ field }: Props) {
  const { id, formId, type, label, isRequired, cssClass, placeholder } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: StringFieldValue) => fieldValue.id === id);
  const value = fieldValue?.value || DEFAULT_VALUE;

  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <label htmlFor={htmlId}>{label}</label>
      <input
        type="tel"
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        placeholder={placeholder || ''}
        value={value}
        onChange={event => {
          dispatch({
            type: ACTION_TYPES.updatePhoneFieldValue,
            fieldValue: {
              id,
              value: event.target.value,
            },
          })
        }}
      />
    </div>
  );
}
