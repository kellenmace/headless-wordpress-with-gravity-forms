import { gql } from "@apollo/client";
import React from "react";

import { AddressField as AddressFieldType } from "../../generated/graphql";
import useGravityForm, { ACTION_TYPES, AddressFieldValue, AddressValues } from "../../hooks/useGravityForm";

export const ADDRESS_FIELD_FIELDS = gql`
  fragment AddressFieldFields on AddressField {
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
  field: AddressFieldType;
}

const DEFAULT_VALUE: AddressValues = {};

const AUTOCOMPLETE_ATTRIBUTES: { [key: string]: string } = {
  street: 'address-line1',
  lineTwo: 'address-line2',
  city: 'address-level2',
  state: 'address-level1',
  country: 'country-name',
};

export default function AddressField({ field }: Props) {
  const { id, formId, label, inputs } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: AddressFieldValue) => fieldValue.id === id);
  const addressValues = fieldValue?.addressValues || DEFAULT_VALUE;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const newAddressValues = { ...addressValues, [name]: value };

    dispatch({
      type: ACTION_TYPES.updateAddressFieldValue,
      fieldValue: {
        id,
        addressValues: newAddressValues,
      },
    });
  }

  return (
    <fieldset id={htmlId}>
      <legend>{label}</legend>
      {inputs?.map(input => {
        const key = input?.key || '';
        const inputLabel = input?.label || '';
        return (
          <div key={key}>
            <input
              type="text"
              name={String(key)}
              id={`input_${formId}_${id}_${key}`}
              autoComplete={AUTOCOMPLETE_ATTRIBUTES[key]}
              value={addressValues?.[key] || ''}
              onChange={handleChange}
            />
            <label htmlFor={`input_${formId}_${id}_${key}`}>{inputLabel}</label>
          </div>
        );
      }
      )}
    </fieldset>
  );
}
