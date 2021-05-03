import { gql } from "@apollo/client";

import { NameField as NameFieldType } from "../../generated/graphql";
import useGravityForm, { ACTION_TYPES, NameFieldValue, NameValues } from "../../hooks/useGravityForm";

export const NAME_FIELD_FIELDS = gql`
  fragment NameFieldFields on NameField {
    id
    formId
    label
    inputs {
      key
      label
    }
  }
`;

interface Props {
  field: NameFieldType;
}

const DEFAULT_VALUE: NameValues = {};

export default function NameField({ field }: Props) {
  const { id, formId, label, inputs } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: NameFieldValue) => fieldValue.id === id);
  const nameValues = fieldValue?.nameValues || DEFAULT_VALUE;

  const prefixInput = inputs?.find(input => input?.key === 'prefix');
  const otherInputs = inputs?.filter(input => input?.key !== 'prefix') || [];

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>): void {
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

  function handleTextInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
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
    <fieldset id={htmlId}>
      <legend>{label}</legend>
      {prefixInput ?
        <>
          <select
            name={String(prefixInput.key)}
            id={`input_${formId}_${id}_${prefixInput.key}`}
            value={nameValues?.[String(prefixInput.key)] || ''}
            onChange={handleSelectChange}
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
        return (
          <div key={key}>
            <input
              type="text"
              name={String(key)}
              id={`input_${formId}_${id}_${key}`}
              value={nameValues?.[key] || ''}
              onChange={handleTextInputChange}
            />
            <label htmlFor={`input_${formId}_${id}_${key}`}>{inputLabel}</label>
          </div>
        );
      }
      )}
    </fieldset>
  );
}
