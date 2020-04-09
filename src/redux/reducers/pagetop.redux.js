const pagetop = (state=0,action)=> {
  switch(action.type) {
    case 'SET_PAGETOP': return action.payload;
    default: return state;
  }
}
export default pagetop;