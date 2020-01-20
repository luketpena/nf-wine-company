const supplierReducer = (state=[],action)=> {
  switch(action.type) {
    case 'SET_SUPPLIERS': return action.payload;
    default: return state;
  }
}
export default supplierReducer;