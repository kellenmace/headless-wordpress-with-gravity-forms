import { FormField } from "../generated/graphql";
import CheckboxField from "./GravityFormsFields/CheckboxField";
import DateField from "./GravityFormsFields/DateField";
import EmailField from "./GravityFormsFields/EmailField";
import MultiSelectField from "./GravityFormsFields/MultiSelectField";
import NameField from "./GravityFormsFields/NameField";
import PhoneField from "./GravityFormsFields/PhoneField";
import RadioField from "./GravityFormsFields/RadioField";
import SelectField from "./GravityFormsFields/SelectField";
import TextField from "./GravityFormsFields/TextField";
import TextAreaField from "./GravityFormsFields/TextAreaField";
import TimeField from "./GravityFormsFields/TimeField";
import WebsiteField from "./GravityFormsFields/WebsiteField";

interface Props {
  field: FormField;
}

export default function Field({ field }: Props) {
  switch (field.type) {
    case "checkbox":
      return <CheckboxField field={field} />;
    case "date":
      return <DateField field={field} />;
    case "email":
      return <EmailField field={field} />;
    case "multiselect":
      return <MultiSelectField field={field} />;
    case "name":
      return <NameField field={field} />;
    case "phone":
      return <PhoneField field={field} />;
    case "radio":
      return <RadioField field={field} />;
    case "select":
      return <SelectField field={field} />;
    case "text":
      return <TextField field={field} />;
    case "textarea":
      return <TextAreaField field={field} />;
    case "time":
      return <TimeField field={field} />;
    case "website":
      return <WebsiteField field={field} />;
    default:
      return <p>{`Field type not supported: ${field.type}.`}</p>;
  }
}
