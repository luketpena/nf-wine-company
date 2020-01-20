const supplierReducer = (state={
    filter: {
      search: '',
      country: '',
      region: '',
    },
    supplierList: []
  },action)=> {
  switch(action.type) {
    case 'SET_SUPPLIER_FILTER': return {...state, filter: action.payload};
    case 'SET_SUPPLIERS': return {...state, supplierList: action.payload};
    default: return state;
  }
}
export default supplierReducer;