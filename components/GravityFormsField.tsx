import { FormField, FieldError } from "../generated/graphql";
import AddressField from "./GravityFormsFields/AddressField";
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
  fieldErrors: FieldError[];
}

export default function GravityFormsField({ field, fieldErrors }: Props) {
  switch (field.type) {
    case "address":
      return <AddressField field={field} fieldErrors={fieldErrors} />;
    case "checkbox":
      return <CheckboxField field={field} fieldErrors={fieldErrors} />;
    case "date":
      return <DateField field={field} fieldErrors={fieldErrors} />;
    case "email":
      return <EmailField field={field} fieldErrors={fieldErrors} />;
    case "multiselect":
      return <MultiSelectField field={field} fieldErrors={fieldErrors} />;
    case "name":
      return <NameField field={field} fieldErrors={fieldErrors} />;
    case "phone":
      return <PhoneField field={field} fieldErrors={fieldErrors} />;
    case "radio":
      return <RadioField field={field} fieldErrors={fieldErrors} />;
    case "select":
      return <SelectField field={field} fieldErrors={fieldErrors} />;
    case "text":
      return <TextField field={field} fieldErrors={fieldErrors} />;
    case "textarea":
      return <TextAreaField field={field} fieldErrors={fieldErrors} />;
    case "time":
      return <TimeField field={field} fieldErrors={fieldErrors} />;
    case "website":
      return <WebsiteField field={field} fieldErrors={fieldErrors} />;
    default:
      return <p>{`Field type not supported: ${field.type}.`}</p>;
  }
}
