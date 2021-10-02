import {combineReducers} from "redux";
import studentsReducers from "./StudentsReducers";

// There is store all reducers for work with any entity
const rootReducers = combineReducers({
    dataOfStudents: studentsReducers
})

export default rootReducers