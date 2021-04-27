import { createContext, ReactNode, useContext, useReducer } from "react";

interface FieldValue {
  id: number;
}

export interface EmailFieldValue extends FieldValue {
  emailValues: {
    value: string;
  };
}

export interface StringFieldValue extends FieldValue {
  value: string;
}

export type FieldValueUnion = EmailFieldValue | StringFieldValue;

interface Action {
  type: ACTION_TYPES;
  fieldValue: FieldValueUnion;
}

export enum ACTION_TYPES {
  updateEmailFieldValue = 'updateEmailFieldValue',
  updateTextAreaFieldValue = 'updateTextAreaFieldValue',
  updateTextFieldValue = 'updateTextFieldValue',
}

function reducer(state: FieldValueUnion[], action: Action) {
  switch (action.type) {
    case ACTION_TYPES.updateEmailFieldValue: {
      const { id, emailValues } = action.fieldValue as EmailFieldValue;
      const otherFieldValues = state.filter(fieldValue => fieldValue.id !== id);
      return [...otherFieldValues, { id, emailValues }];
    }
    case ACTION_TYPES.updateTextAreaFieldValue:
    case ACTION_TYPES.updateTextFieldValue: {
      const { id, value } = action.fieldValue as StringFieldValue;
      const otherFieldValues = state.filter(fieldValue => fieldValue.id !== id);
      return [...otherFieldValues, { id, value }];
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
