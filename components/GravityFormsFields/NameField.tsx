import { gql } from "@apollo/client";

import { NameField as NameFieldType, FieldError } from "../../generated/graphql";
import useGravityForm, { ACTION_TYPES, NameFieldValue, NameValues } from "../../hooks/useGravityForm";

export const NAME_FIELD_FIELDS = gql`
  fragment NameFieldFields on NameField {
    id
    formId
    label
    description
    cssClass
    inputs {
      key
      label
      placeholder
    }
  }
`;

interface Props {
  field: NameFieldType;
  fieldErrors: FieldError[];
}

const DEFAULT_VALUE: NameValues = {};

const AUTOCOMPLETE_ATTRIBUTES: { [key: string]: string } = {
  prefix: 'honorific-prefix',
  first: 'given-name',
  middle: 'additional-name',
  last: 'family-name',
  suffix: 'honorific-suffix',
};

export default function NameField({ field, fieldErrors }: Props) {
  const { id, formId, type, label, description, cssClass, inputs } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: NameFieldValue) => fieldValue.id === id);
  const nameValues = fieldValue?.nameValues || DEFAULT_VALUE;

  const prefixInput = inputs?.find(input => input?.key === 'prefix');
  const otherInputs = inputs?.filter(input => input?.key !== 'prefix') || [];

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    const newNameValues = { ...nameValues, [name]: value };

    dispatch({
      type: ACTION_TYPES.updateNameFieldValue,
      fieldValue: {
        id,
        nameValues: newNameValues,
      },
    });
  }

  return (
    <fieldset id={htmlId} className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <legend>{label}</legend>
      {prefixInput ?
        <>
          <select
            name={String(prefixInput.key)}
            id={`input_${formId}_${id}_${prefixInput.key}`}
            autoComplete={AUTOCOMPLETE_ATTRIBUTES.prefix}
            value={nameValues?.[String(prefixInput.key)] || ''}
            onChange={handleChange}
          >
            {/* TODO: Query for these when they're added to the GraphQL schema: https://github.com/harness-software/wp-graphql-gravity-forms/issues/101 */}
            <option value=""></option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Miss">Miss</option>
            <option value="Ms.">Ms.</option>
            <option value="Dr.">Dr.</option>
            <option value="Prof.">Prof.</option>
            <option value="Rev.">Rev.</option>
          </select>
          <label htmlFor={`input_${formId}_${id}_${prefixInput.key}`}>{prefixInput.label}</label>
        </> : null
      }
      {otherInputs.map(input => {
        const key = input?.key || '';
        const inputLabel = input?.label || '';
        const placeholder = input?.placeholder || '';
        return (
          <div key={key}>
            <input
              type="text"
              name={String(key)}
              id={`input_${formId}_${id}_${key}`}
              placeholder={placeholder}
              autoComplete={AUTOCOMPLETE_ATTRIBUTES[key]}
              value={nameValues?.[key] || ''}
              onChange={handleChange}
            />
            <label htmlFor={`input_${formId}_${id}_${key}`}>{inputLabel}</label>
          </div>
        );
      }
      )}
      {description ? <p className="field-description">{description}</p> : null}
      {fieldErrors?.length ? fieldErrors.map(fieldError => (
        <p key={fieldError.id} className="error-message">{fieldError.message}</p>
      )) : null}
    </fieldset>
  );
}
