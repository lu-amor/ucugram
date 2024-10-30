import { PROFILE_ACTIONS } from "./../context/ProfileContext";

export default function profileReducer(state, action) {
  switch (action.type) {
    case PROFILE_ACTIONS.SET_PROFILE:
      return {
        ...state,
        user: action.payload.user,
        posts: action.payload.posts,
        loading: false,
        error: null,
      };
    case PROFILE_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PROFILE_ACTIONS.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export const initialState = {
  user: null,
  posts: [],
  loading: false,
  error: null,
};
