export const MAIN_API = process.env.REACT_APP_MAIN_API_URL
export const ALGORIXMO_MAIN_API = process.env.REACT_APP_ALGORIXMO_API_URL

export const CLIENT_NAME = 'Suba Vote'
export const CLIENT_TOKEN = process.env.REACT_APP_CLIENT_TOKEN

export const MODAL_MSGES = {
  VOTERS: {
    ADD_SUCCESS_MSG:
      "You've successfully created a new voter to the system. The voter details have been saved and are now available in the carousal.",
    UPDATE_SUCCESS_MSG:
      "You've successfully updated the voter. The voter details have been saved and are now available in the carousal.",
  },
  ORGANIZERS: {
    ADD_SUCCESS_MSG:
      "You've successfully created a new organizer to the system. The organizer details have been saved and are now available in the carousal.",
    UPDATE_SUCCESS_MSG:
      "You've successfully updated the organizer. The organizer details have been saved and are now available in the carousal.",
  },
  TASKS: {
    ADD_SUCCESS_MSG:
      "You've successfully created a new task for the organizer. The task details have been saved and are now available in the carousal.",
    UPDATE_SUCCESS_MSG:
      "You've successfully updated the task. The task details have been saved and are now available in the carousal.",
      NO_TASKS: "No Tasks Found! This might be because there is no tasks available at the moment"
  },
  LOGIN_INVALID: 'No user found for this username/password!!',
  ERROR_MSG: 'Somthing Went Wrong!! Please Try Again.',
  SEARCH_NO_DATA_DOUND:
    "Sorry, we couldn't find any data matching your request!! Please check your search criteria or try again later.",
  NO_DATA_FOUND: 'No Data Found!! This might be because there is no data available at the moment',
}

export const COLORS = {
  MAIN: '#C36302',
  MID_LIGHT: '#D38D46',
  LIGHT: '#FFF4EB',
  DANGER_BTN: '#C40202',
}
