const customerAccounts = (state = [], action) => {
  switch (action.type) {
    case 'SET_CUSTOMER_ACCOUNTS':
      return action.payload;
    default: return state;
  }
};

// user will be on the redux state at:
// state.user
export default customerAccounts;