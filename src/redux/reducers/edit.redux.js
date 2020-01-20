const editReducer = (state={ editInfo: {
  }, ready: false }, action)=> {
  switch(action.type) {
    case 'SET_EDIT_READY': return {...state, ready: action.payload };
    case 'SET_EDIT_INFO': return { ...state, editInfo: action.payload };
    default: return state;
  }
}
export default editReducer;