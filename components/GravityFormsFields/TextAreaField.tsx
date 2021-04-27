interface Props {
  field: {
    id: string;
    formId: string;
    type: string;
    label: string;
    isRequired: boolean;
  };
  value: string;
  updateValue: (newValue: string) => void,
}

export default function TextAreaField({ field, value, updateValue }: Props) {
  const { id, formId, label, isRequired } = field;
  const htmlId = `field_${formId}_${id}`;

  return (
    <>
      <label htmlFor={htmlId}>{label}</label>
      <textarea
        name={id}
        id={htmlId}
        required={isRequired}
        value={value}
        onChange={event => updateValue(event.target.value)}
      />
    </>
  );
}
