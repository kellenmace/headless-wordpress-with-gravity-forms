import { SyntheticEvent } from "react";
import { gql } from "@apollo/client";

import { CheckboxField as CheckboxFieldType } from "../../generated/graphql";
import useGravityForm, { ACTION_TYPES, CheckboxFieldValue, SingleCheckboxValue } from "../../hooks/useGravityForm";

export const CHECKBOX_FIELD_FIELDS = gql`
  fragment CheckboxFieldFields on CheckboxField {
    id
    formId
    label
    inputs {
      id
    }
    choices {
      text
      value
    }
  }
`;

interface Props {
  field: CheckboxFieldType;
}

const DEFAULT_VALUE: SingleCheckboxValue[] = [];

export default function CheckboxField({ field }: Props) {
  const { id, formId, label, inputs, choices } = field;
  const checkboxInputs = choices?.map((choice, index) => ({ ...choice, id: inputs?.[index]?.id })) || [];
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: CheckboxFieldValue) => fieldValue.id === id);
  const checkboxValues = fieldValue?.checkboxValues || DEFAULT_VALUE;

  function handleChange(event: SyntheticEvent) {
    const { name, value, checked } = event.target;
    const otherCheckboxValues = checkboxValues.filter(
      (checkboxValue: SingleCheckboxValue) => checkboxValue.inputId !== Number(name)
    );
    const newCheckboxValues = checked ?
      [...otherCheckboxValues, { inputId: Number(name), value }]
      :
      otherCheckboxValues;

    dispatch({
      type: ACTION_TYPES.updateCheckboxFieldValue,
      fieldValue: {
        id,
        checkboxValues: newCheckboxValues,
      },
    });
  }

  return (
    <fieldset id={htmlId}>
      <legend>{label}</legend>
      {checkboxInputs.map(({ id: inputId, text, value }) =>
        <div key={inputId}>
          <input
            type="checkbox"
            name={String(inputId)}
            id={`choice_${formId}_${id}_${inputId}`}
            value={String(value)}
            onChange={handleChange}
          />
          <label htmlFor={`choice_${formId}_${id}_${inputId}`}>{text}</label>
        </div>
      )}
    </fieldset>
  );
}
