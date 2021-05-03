import { gql } from "@apollo/client";

import { WebsiteField as WebsiteFieldType } from "../../generated/graphql";
import useGravityForm, { ACTION_TYPES, StringFieldValue } from "../../hooks/useGravityForm";

export const WEBSITE_FIELD_FIELDS = gql`
  fragment WebsiteFieldFields on WebsiteField {
    id
    formId
    label
    isRequired
    placeholder
  }
`;

interface Props {
  field: WebsiteFieldType;
}

const DEFAULT_VALUE = '';

export default function WebsiteField({ field }: Props) {
  const { id, formId, label, isRequired, placeholder } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: StringFieldValue) => fieldValue.id === id);
  const value = fieldValue?.value || DEFAULT_VALUE;

  return (
    <>
      <label htmlFor={htmlId}>{label}</label>
      <input
        type="url"
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        placeholder={placeholder || ''}
        value={value}
        onChange={event => {
          dispatch({
            type: ACTION_TYPES.updateWebsiteFieldValue,
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
