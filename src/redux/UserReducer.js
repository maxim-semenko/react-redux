import * as types from "./ActionType"

const initialState = {
    students: [],
    student: {},
    loading: true,
    currentPage: 1,
    perPage: 5,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0
}

const studentsReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_STUDENTS:
        case types.GET_STUDENTS_BY_LASTNAME:
            return {
                ...state,
                students: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                numberOfElements: action.payload.numberOfElements,
                loading: false,
            }
        case types.GET_STUDENT:
            return {
                ...state,
                student: action.payload,
                loading: false,
            }
        case types.SAVE_STUDENT:
        case types.DELETE_STUDENT:
            return {
                ...state
            }
        case types.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case types.SET_SIZE_PAGE:
            return {
                ...state,
                perPage: action.payload
            }
        default:
            return state
    }
}

export default studentsReducers;