import { SyntheticEvent } from "react";
import { gql } from "@apollo/client";

import { RadioField as RadioFieldType } from "../../generated/graphql";
import useGravityForm, { ACTION_TYPES, StringFieldValue } from "../../hooks/useGravityForm";

export const RADIO_FIELD_FIELDS = gql`
  fragment RadioFieldFields on RadioField {
    id
    formId
    label
    choices {
      text
      value
    }
  }
`;

interface Props {
  field: RadioFieldType;
}

const DEFAULT_VALUE = '';

export default function RadioField({ field }: Props) {
  const { id, formId, label, choices } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: StringFieldValue) => fieldValue.id === id);
  const value = fieldValue?.value || DEFAULT_VALUE;

  function handleChange(event: SyntheticEvent) {
    console.log('handleChange() called');
    dispatch({
      type: ACTION_TYPES.updateRadioFieldValue,
      fieldValue: {
        id,
        value: event.target.value,
      },
    });
  }

  return (
    <fieldset id={htmlId}>
      <legend>{label}</legend>
      {choices?.map(({ text, value: inputValue }) =>
        <div key={inputValue}>
          <input
            type="radio"
            name={String(id)}
            id={`choice_${formId}_${id}_${inputValue}`}
            value={inputValue}
            onChange={handleChange}
          />
          <label htmlFor={`choice_${formId}_${id}_${value}`}>{text}</label>
        </div>
      )}
    </fieldset>
  );
}
