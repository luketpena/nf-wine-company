const supplierReducer = (state={
    supplierList: []
  },action)=> {
  switch(action.type) {
    case 'SET_SUPPLIERS': return {...state, supplierList: action.payload};
    default: return state;
  }
}
export default supplierReducer;