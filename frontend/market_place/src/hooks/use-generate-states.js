function useGenerateStates(data){
    let generatedState = {}
    data.forEach(element => {
      generatedState[element.label] = ""
    });
    return generatedState
  }
  export default useGenerateStates