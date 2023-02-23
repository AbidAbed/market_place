import { useReducer } from "react";
import useCreateFormBody from "../hooks/use-create-form-body";
import useGenerateStates from "../hooks/use-generate-states";
import Form from "./Form";

function reducer(state, action) {
  //   state[action.type] = `${state[action.type]}${action.payload}`;
  //   return state;
  //WRONG !! , WHY? , you see , in 'useCreateFormBody' input component
  //receives the aurg 'state' which is sat to 'value" prop of <Input/>
  //if we do the above code , we change the reff of state meaning no updates
  //will receive the <Input/> component
  return {
    ...state,
    [action.type]: action.payload,
  };
}

function DataForm({ formSkeleton, onChange, errors }) {
  const generatedState = useGenerateStates(formSkeleton);
  const [state, dispatch] = useReducer(reducer, generatedState);
  
  const formData = useCreateFormBody(
    formSkeleton,
    handleFormEntityChange,
    state
  );

  function handleFormEntityChange(event, label) {
    dispatch({ type: label, payload: event.target.value });
  }

  function onFormSubmit(event){
    onChange(event,state)
  }
  return <Form formData={formData} onChange={onFormSubmit} errors={errors}></Form>;
}

export default DataForm;
