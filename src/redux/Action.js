import * as types from "./ActionType"
import axios from "axios";
import store from "./Store";


const gotStudents = (students) => ({
    type: types.GET_STUDENTS,
    payload: students,
})

const gotStudentById = (student) => ({
    type: types.GET_STUDENT,
    payload: student,
})

const gotStudentsByLastname = (students) => ({
    type: types.GET_STUDENTS_BY_LASTNAME,
    payload: students,
})

const createdStudent = () => ({
    type: types.SAVE_STUDENT,
})

const updatedStudent = () => ({
    type: types.UPDATE_STUDENT,
})

const deletedStudent = (student) => ({
    type: types.DELETE_STUDENT,
    payload: student,
})

export const setCurrentPage = (page) => ({
    type: types.SET_CURRENT_PAGE,
    payload: page
})

export const setSizePage = (size) => ({
    type: types.SET_SIZE_PAGE,
    payload: size
})

//============================================ Axios requests ==========================================================

export const loadStudents = (currentPage, perPage) => {
    return function (dispatch) {
        console.log(`${process.env.REACT_APP_API}/students/?page=${currentPage - 1}&size=${perPage}`)
        axios.get(`${process.env.REACT_APP_API}/students/?page=${currentPage - 1}&size=${perPage}`)
            .then((resp) => {
                dispatch(gotStudents(resp.data))
            }).catch(error => console.log(error))
    }
}

export const loadStudentById = (id) => {
    return function (dispatch) {
        console.log(`${process.env.REACT_APP_API}/students/${id}`)
        axios.get(`${process.env.REACT_APP_API}/students/${id}`)
            .then((resp) => {
                dispatch(gotStudentById(resp.data))
            }).catch(error => console.log(error))
    }
}

export const loadStudentsByLastname = (currentPage, perPage, lastname) => {
    return function (dispatch) {
        console.log(`${process.env.REACT_APP_API}/students/lastname/${lastname}?page=${currentPage - 1}&size=${perPage}`)
        axios.get(`${process.env.REACT_APP_API}/students/lastname/${lastname}?page=${currentPage - 1}&size=${perPage}`)
            .then((resp) => {
                dispatch(gotStudentsByLastname(resp.data))
            }).catch(error => console.log(error))
    }
}

export const saveStudent = (student) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_API}/students/`, student)
            .then((resp) => {
                dispatch(createdStudent)
                dispatch(loadStudents(store.getState().dataOfStudents.currentPage, store.getState().dataOfStudents.perPage))
            }).catch(error => console.log(error))
    }
}

export const updateStudent = (student) => {
    return function (dispatch) {
        const id = store.getState().dataOfStudents.student.id
        console.log(`${process.env.REACT_APP_API}/students/${id}`)
        axios.put(`${process.env.REACT_APP_API}/students/${id}`, student)
            .then((resp) => {
                dispatch(updatedStudent)
                dispatch(loadStudents(store.getState().dataOfStudents.currentPage, store.getState().dataOfStudents.perPage))
            }).catch(error => console.log(error))
    }
}

// store.getState().dataOfStudents.currentPage
export const removeStudent = (id) => {
    return function (dispatch) {
        console.log(`${process.env.REACT_APP_API}/students/${id}`)
        axios.delete(`${process.env.REACT_APP_API}/students/${id}`)
            .then((resp) => {
                dispatch(deletedStudent(resp.data))
                dispatch(loadStudents(store.getState().dataOfStudents.currentPage, store.getState().dataOfStudents.perPage))
            }).catch(error => console.log(error))
    }
}