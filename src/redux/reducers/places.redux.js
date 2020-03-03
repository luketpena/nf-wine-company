const placesReducer = (state={
  country_details: {},
  countries: [],
  regions: [],
  subregions: []
}, action) => {
  switch(action.type) {
    case 'SET_COUNTRY_DETAILS': return {...state, country_details: action.payload}
    case 'SET_COUNTRIES': return {...state, countries: action.payload}
    case 'SET_REGIONS': return {...state, regions: action.payload}
    case 'SET_SUBREGIONS': return {...state, subregions: action.payload}
    default: return state;
  }
}
export default placesReducer;