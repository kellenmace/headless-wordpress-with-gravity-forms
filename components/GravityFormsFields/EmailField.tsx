import { EmailField as EmailFieldType } from "../../generated/graphql";
import useGravityForm, { ACTION_TYPES, EmailFieldValue } from "../../hooks/useGravityForm";

interface Props {
  field: EmailFieldType;
}

const DEFAULT_VALUE = '';

export default function EmailField({ field }: Props) {
  const { id, formId, label, isRequired } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: EmailFieldValue) => fieldValue.id === id);
  const value = fieldValue?.emailValues?.value || DEFAULT_VALUE;

  return (
    <>
      <label htmlFor={htmlId}>{label}</label>
      <input
        type="email"
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        value={value}
        onChange={event => {
          dispatch({
            type: ACTION_TYPES.updateEmailFieldValue,
            fieldValue: {
              id,
              emailValues: {
                value: event.target.value,
              }
            },
          })
        }}
      />
    </>
  );
}
