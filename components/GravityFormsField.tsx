import { FormField } from "../generated/graphql";
import EmailField from "./GravityFormsFields/EmailField";
import TextField from "./GravityFormsFields/TextField";
import TextAreaField from "./GravityFormsFields/TextAreaField";

interface Props {
  field: FormField;
}

export default function Field({ field }: Props) {
  switch (field.type) {
    case "email":
      return <EmailField field={field} />;
    case "text":
      return <TextField field={field} />;
    case "textarea":
      return <TextAreaField field={field} />;
    default:
      return <p>{`Field type not supported: ${field.type}.`}</p>
  }
}
