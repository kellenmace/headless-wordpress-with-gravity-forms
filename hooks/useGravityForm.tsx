import { createContext, ReactNode, useContext, useReducer } from "react";

interface FieldValue {
  id: number;
}

export type SingleCheckboxValue = {
  inputId: number,
  value: string,
}

export interface CheckboxFieldValue extends FieldValue {
  checkboxValues: SingleCheckboxValue[];
}

export interface EmailFieldValue extends FieldValue {
  emailValues: {
    value: string;
  };
}

export interface StringFieldValue extends FieldValue {
  value: string;
}

export interface StringFieldValues extends FieldValue {
  values: string[];
}

export type FieldValueUnion = CheckboxFieldValue | EmailFieldValue | StringFieldValue | StringFieldValues;

interface Action {
  type: ACTION_TYPES;
  fieldValue: FieldValueUnion;
}

export enum ACTION_TYPES {
  updateCheckboxFieldValue = 'updateCheckboxFieldValue',
  updateDateFieldValue = 'updateDateFieldValue',
  updateEmailFieldValue = 'updateEmailFieldValue',
  updateMultiSelectFieldValue = 'updateMultiSelectFieldValue',
  updatePhoneFieldValue = 'updatePhoneFieldValue',
  updateRadioFieldValue = 'updateRadioFieldValue',
  updateSelectFieldValue = 'updateSelectFieldValue',
  updateTextAreaFieldValue = 'updateTextAreaFieldValue',
  updateTextFieldValue = 'updateTextFieldValue',
  updateTimeFieldValue = 'updateTimeFieldValue',
  updateWebsiteFieldValue = 'updateWebsiteFieldValue',
}

function reducer(state: FieldValueUnion[], action: Action) {
  const getOtherFieldValues = (id: number) => state.filter(fieldValue => fieldValue.id !== id);

  switch (action.type) {
    case ACTION_TYPES.updateCheckboxFieldValue: {
      const { id, checkboxValues } = action.fieldValue as CheckboxFieldValue;
      return [...getOtherFieldValues(id), { id, checkboxValues }];
    }
    case ACTION_TYPES.updateEmailFieldValue: {
      const { id, emailValues } = action.fieldValue as EmailFieldValue;
      return [...getOtherFieldValues(id), { id, emailValues }];
    }
    case ACTION_TYPES.updateMultiSelectFieldValue: {
      const { id, values } = action.fieldValue as StringFieldValues;
      return [...getOtherFieldValues(id), { id, values }];
    }
    case ACTION_TYPES.updateDateFieldValue:
    case ACTION_TYPES.updateRadioFieldValue:
    case ACTION_TYPES.updateSelectFieldValue:
    case ACTION_TYPES.updateTextAreaFieldValue:
    case ACTION_TYPES.updateTextFieldValue:
    case ACTION_TYPES.updateTimeFieldValue:
    case ACTION_TYPES.updatePhoneFieldValue:
    case ACTION_TYPES.updateWebsiteFieldValue: {
      const { id, value } = action.fieldValue as StringFieldValue;
      return [...getOtherFieldValues(id), { id, value }];
    }
    default:
      throw new Error(`Field value update operation not supported: ${action.type}.`);
  }
}

const DEFAULT_STATE: FieldValueUnion[] = [];
const GravityFormContext = createContext(DEFAULT_STATE);

export function GravityFormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return (
    <GravityFormContext.Provider value={{ state, dispatch }}>
      {children}
    </GravityFormContext.Provider>
  );
}

const useGravityForm = () => useContext(GravityFormContext);

export default useGravityForm;
