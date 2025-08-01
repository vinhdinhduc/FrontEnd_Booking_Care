import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGenders: [],
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
  allTimeSchedule: [],
  allRequiredInfoDoctor: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGenders = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGenders = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGenders = false;
      state.genders = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      };
    case actionTypes.CREATE_USER_SUCCESS:
      state.users = action.data;
      return {
        ...state,
      };
    case actionTypes.CREATE_USER_FAILED:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAILED:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      state.topDoctors = action.dataDoctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTORS_FAILED:
      state.topDoctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      state.allDoctors = action.dataDr;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      state.topDoctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_SCHEDULE_HOURS_DOCTORS_SUCCESS:
      state.allTimeSchedule = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_SCHEDULE_HOURS_DOCTORS_FAILED:
      state.allTimeSchedule = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
      state.allRequiredInfoDoctor = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
      state.allRequiredInfoDoctor = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
