import React from 'react'
import {Button, Modal} from "react-bootstrap"
import {removeStudent, setCurrentPage} from "../redux/Action";
import {useDispatch, useSelector} from "react-redux";


function DeleteStudentModal(props) {

    const dispatch = useDispatch()
    const student = useSelector(state => state.dataOfStudents.student)
    const currentPage = useSelector(state => state.dataOfStudents.currentPage)
    const numberOfElements = useSelector(state => state.dataOfStudents.numberOfElements)

    const handleSubmit = () => {
        if (numberOfElements === 1 && currentPage !== 1) {
            dispatch(setCurrentPage(currentPage - 1))
            dispatch(removeStudent(student.id))
        } else {
            dispatch(removeStudent(student.id))
        }
        props.onHide()
    }

    return (
        <div>
            <Modal{...props}
                  size="sm"
                  aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Body className="modal-dark">
                    <p>Вы уверены, что хотите удалить студента {student.firstname} {student.lastname}?</p>
                    <Button variant="danger" onClick={() => props.onHide()}>Нет</Button>
                    {' '}
                    <Button variant="primary" type="submit" onClick={handleSubmit}>Да</Button>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default DeleteStudentModal