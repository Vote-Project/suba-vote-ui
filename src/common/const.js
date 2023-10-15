export const MAIN_API = process.env.REACT_APP_MAIN_API_URL
export const ALGORIXMO_MAIN_API = process.env.REACT_APP_ALGORIXMO_API_URL

export const MODAL_MSGES = {
    VOTERS : {
        ADD_SUCCESS_MSG: "You've successfully created a new voter to the system. The voter details have been saved and are now available in the carousal.",
        UPDATE_SUCCESS_MSG: "You've successfully updated the voter. The voter details have been saved and are now available in the carousal."
    },
    ORGANIZERS : {
        ADD_SUCCESS_MSG: "You've successfully created a new organizer to the system. The organizer details have been saved and are now available in the carousal.",
        UPDATE_SUCCESS_MSG: "You've successfully updated the organizer. The organizer details have been saved and are now available in the carousal."
    },
    ERROR_MSG: "Somthing Went Wrong!! Please Try Again.",
    NO_DATA_FOUND: "No Data Found!! This might be because there is no data available at the moment"
}


export const COLORS = {
    MAIN: "#C36302",
    LIGHT: "#FFF4EB",
    DANGER_BTN: "#C40202"
}