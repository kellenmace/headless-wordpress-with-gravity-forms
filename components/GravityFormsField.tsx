import { FormField } from "../generated/graphql";
import CheckboxField from "./GravityFormsFields/CheckboxField";
import EmailField from "./GravityFormsFields/EmailField";
import MultiSelectField from "./GravityFormsFields/MultiSelectField";
import SelectField from "./GravityFormsFields/SelectField";
import TextField from "./GravityFormsFields/TextField";
import TextAreaField from "./GravityFormsFields/TextAreaField";
import WebsiteField from "./GravityFormsFields/WebsiteField";

interface Props {
  field: FormField;
}

export default function Field({ field }: Props) {
  switch (field.type) {
    case "checkbox":
      return <CheckboxField field={field} />;
    case "email":
      return <EmailField field={field} />;
    case "multiselect":
      return <MultiSelectField field={field} />;
    case "select":
      return <SelectField field={field} />;
    case "text":
      return <TextField field={field} />;
    case "textarea":
      return <TextAreaField field={field} />;
    case "website":
      return <WebsiteField field={field} />;
    default:
      return <p>{`Field type not supported: ${field.type}.`}</p>;
  }
}
