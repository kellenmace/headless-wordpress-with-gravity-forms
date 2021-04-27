import TextField from './GravityFormsFields/TextField';
import TextAreaField from './GravityFormsFields/TextAreaField';
import EmailField from './GravityFormsFields/EmailField';

interface Props {
  field: any;
  fieldValues: Record<string, unknown>[];
  setFieldValues: (newFieldValues: Record<string, unknown>[]) => void;
}

export default function Field({ field, fieldValues, setFieldValues }: Props) {
  switch (field.type) {
    case "text": {
      const { id } = field;
      const fieldValue = fieldValues.find(fieldValue => fieldValue.id === field.id);
      const otherFieldValues = fieldValues.filter(fieldValue => fieldValue.id !== field.id);
      const value = String(fieldValue?.value || '');
      const updateValue = (newValue: string) => setFieldValues([...otherFieldValues, { id, value: newValue }]);
      return <TextField field={field} value={value} updateValue={updateValue} />
    }
    // case "textarea": {
    //   const value = String(fieldValues[field.id] || '');
    //   const updateValue = (newValue: string) => setFieldValues({ ...fieldValues, [field.id]: newValue });
    //   return <TextAreaField field={field} value={value} updateValue={updateValue} />
    // }
    // case "email": {
    //   const value = String(fieldValues[field.id] || '');
    //   const updateValue = (newValue: string) => setFieldValues({ ...fieldValues, [field.id]: newValue });
    //   return <EmailField field={field} value={value} updateValue={updateValue} />
    // }
    default:
      return <p>{`Field type not supported: ${field.type}.`}</p>
  }
}
