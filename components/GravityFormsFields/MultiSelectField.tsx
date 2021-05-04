import { gql } from "@apollo/client";
import Select from 'react-select';

import { MultiSelectField as MultiSelectFieldType, FieldError } from "../../generated/graphql";
import useGravityForm, { ACTION_TYPES, StringFieldValues } from "../../hooks/useGravityForm";

export const MULTI_SELECT_FIELD_FIELDS = gql`
  fragment MultiSelectFieldFields on MultiSelectField {
    id
    formId
    label
    isRequired
    cssClass
    choices {
      text
      value
    }
  }
`;

interface Props {
  field: MultiSelectFieldType;
  fieldErrors: FieldError[];
}

interface Option {
  value: string;
  label: string;
}

const DEFAULT_VALUE: string[] = [];

export default function MultiSelectField({ field, fieldErrors }: Props) {
  const { id, formId, type, label, isRequired, cssClass, choices } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: StringFieldValues) => fieldValue.id === id);
  const values = fieldValue?.values || DEFAULT_VALUE;
  const options = choices?.map(choice => ({ value: choice?.value, label: choice?.text })) || [];
  const selectedOptions = options.filter(option => values.includes(option.value));

  function handleChange(selectedOptions: Option[]) {
    const values = selectedOptions.map(option => option.value);
    dispatch({
      type: ACTION_TYPES.updateMultiSelectFieldValue,
      fieldValue: { id, values },
    });
  }

  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <label htmlFor={htmlId}>{label}</label>
      <Select
        isMulti
        name={String(id)}
        inputId={htmlId}
        required={Boolean(isRequired)}
        options={options}
        value={selectedOptions}
        onChange={handleChange}
      />
      {fieldErrors?.length ? fieldErrors.map(fieldError => (
        <p key={fieldError.id} className="error-message">{fieldError.message}</p>
      )) : null}
    </div>
  );
}
