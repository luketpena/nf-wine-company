const producerReducer = (state=[],action)=> {
  switch(action.type) {
    case 'SET_PRODUCERS': return action.payload;
    default: return state;
  }
}
export default producerReducer;