import { gql } from "@apollo/client";

import { TimeField as TimeFieldType } from "../../generated/graphql";
import useGravityForm, { ACTION_TYPES, StringFieldValue } from "../../hooks/useGravityForm";

export const TIME_FIELD_FIELDS = gql`
  fragment TimeFieldFields on TimeField {
    id
    formId
    label
    cssClass
    isRequired
  }
`;

interface Props {
  field: TimeFieldType;
}

const DEFAULT_VALUE = '';

export default function TimeField({ field }: Props) {
  const { id, formId, type, label, cssClass, isRequired } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: StringFieldValue) => fieldValue.id === id);
  const value = fieldValue?.value || DEFAULT_VALUE;

  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <label htmlFor={htmlId}>{label}</label>
      <input
        type="time"
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        value={value}
        onChange={event => {
          dispatch({
            type: ACTION_TYPES.updateTimeFieldValue,
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
