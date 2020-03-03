const placesReducer = (state={
  country_details: {},
  countries: [],
  regions: []
}, action) => {
  switch(action.type) {
    case 'SET_COUNTRY_DETAILS': return {...state, country_details: action.payload}
    case 'SET_COUNTRIES': return {...state, countries: action.payload}
    case 'SET_REGIONS': return {...state, regions: action.payload}
    default: return state;
  }
}
export default placesReducer;