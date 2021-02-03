// ini bagian user login

const defaultstate = {
  login: false,
  user: '',
  role: '',
};

const userToken = (state = defaultstate, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {login: true, user: action.payload};

    case 'SET_ROLE':
      return {login: true, role: action.payload};
    default:
      return state;
  }
};

export default userToken;
