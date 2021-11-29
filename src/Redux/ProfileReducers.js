import {combineReducers} from 'redux';
import ProfileConstants from './ProfileConstants';

export const profileInfoReducer = (
  state = {
    profile: null,
  },
  action,
) => {
  switch (action.type) {
    case ProfileConstants.PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    default:
      return state;
  }
};

export const profileReducer = combineReducers({
  profile: profileInfoReducer,
});
