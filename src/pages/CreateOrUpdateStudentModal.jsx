import React, {useEffect, useState} from 'react'
import {Button, Form, Modal} from "react-bootstrap"
import {saveStudent, updateStudent} from "../redux/Action";
import {useDispatch, useSelector} from "react-redux";


function CreateOrUpdateStudentModal(props) {

    const dispatch = useDispatch()
    const student = useSelector(state => state.dataOfStudents.student)

    // Student's fields
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [age, setAge] = useState('')

    // Errors
    const [firstnameError, setFirstnameError] = useState('')
    const [lastnameError, setLastnameError] = useState('')
    const [ageError, setAgeError] = useState('')

    useEffect(() => {
        console.log(student)
        if (props.method === "update") {
            setFirstname(student.firstname)
            setLastname(student.lastname)
            setAge(student.age)
        }
    }, [props.method, student])

    const changeFirstname = (event) => {
        setFirstnameError('')
        setFirstname(event.target.value)
    }

    const changeLastname = (event) => {
        setLastnameError('')
        setLastname(event.target.value)
    }

    const changeAge = (event) => {
        setAgeError('')
        setAge(Number.parseInt(event.target.value))
    }

    const findFormErrors = () => {
        let isErrors = false

        // firstname errors
        if (!firstname || firstname === '') {
            isErrors = true
            setFirstnameError('имя не может быть пустым!')
        } else if (firstname.length < 3) {
            isErrors = true
            setFirstnameError('введено слишком короткое имя!')
        }

        // lastname errors
        if (!lastname || lastname === '') {
            isErrors = true
            setLastnameError('фамилия не может быть пустой!')
        } else if (lastname.length < 3) {
            isErrors = true
            setLastnameError('введена слишком короткая фамилия!')
        }

        // age errors
        if (!age) {
            isErrors = true
            setAgeError('возраст не может быть пустым!')
        } else if (age <= 0) {
            isErrors = true
            setAgeError('введен некорректный возраст!')
        }

        return isErrors
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!findFormErrors()) {
            let request = {
                firstname: firstname,
                lastname: lastname,
                age: age,
            }
            if (props.method === "create") {
                dispatch(saveStudent(request))
            } else {
                dispatch(updateStudent(request))
            }
            props.onHide()
        }
    }

    return (
        <div>
            <Modal{...props} size="lg"
                  dialogClassName="modal-90w public-profile-modal-class"
                  aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header>
                    <Modal.Title>{props.method === "create" ? "Добавление студента" : "Изменение данных"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-dark">
                    <Form>
                        <Form.Group>
                            <Form.Label><b>Имя</b></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите имя"
                                value={firstname}
                                onChange={changeFirstname}
                                autocomplete="off"
                                isInvalid={firstnameError}
                            />
                            <Form.Control.Feedback type='invalid'>{firstnameError}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><b>Фамилия</b></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите фамилию"
                                value={lastname}
                                onChange={changeLastname}
                                autocomplete="off"
                                isInvalid={lastnameError}
                            />
                            <Form.Control.Feedback type='invalid'>{lastnameError}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><b>Возраст</b></Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Введите возраст"
                                value={age}
                                onChange={changeAge}
                                autocomplete="off"
                                isInvalid={ageError}
                                min={0}
                            />
                            <Form.Control.Feedback type='invalid'>{ageError}</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => props.onHide()}>Отмена</Button>
                    <Button variant={props.method === "create" ? "primary" : "success"} type="submit"
                            onClick={handleSubmit}>
                        {props.method === "create" ? "Добавить" : "Изменить"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CreateOrUpdateStudentModal