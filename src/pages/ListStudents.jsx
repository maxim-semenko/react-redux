import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {loadStudentById, loadStudents, loadStudentsByLastname, setCurrentPage, setSizePage} from "../redux/Action";

import {Button, Col, Container, Form, FormControl, Navbar, Pagination, Row, Table} from "react-bootstrap";
import CreateOrUpdateStudentModal from "./CreateOrUpdateStudentModal";
import {createPages} from "../pagesCreator";
import DeleteStudentModal from "./DeleteStudentModal";
import {Link} from "react-router-dom";

function ListStudents() {

    const dispatch = useDispatch()
    const students = useSelector(state => state.dataOfStudents.students)
    const loading = useSelector(state => state.dataOfStudents.loading)
    const currentPage = useSelector(state => state.dataOfStudents.currentPage)
    const totalElements = useSelector(state => state.dataOfStudents.totalElements)
    const totalPages = useSelector(state => state.dataOfStudents.totalPages)
    const perPage = useSelector(state => state.dataOfStudents.perPage)
    const pagesCount = Math.ceil(totalElements / perPage)

    const [searchValue, setSearchValue] = useState("")
    const [showCreateUpdateModal, setShowCreateUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [method, setMethod] = useState("")

    const pages = []
    createPages(pages, pagesCount, currentPage)

    const sizes = []
    for (let i = 1; i <= 10; i++) {
        sizes[i] = i;
    }

    useEffect(() => {
        if (searchValue !== "") {
            dispatch(setCurrentPage(1))
            dispatch(loadStudentsByLastname(currentPage, perPage, searchValue))
        } else {
            dispatch(loadStudents(currentPage, perPage))
        }
    }, [currentPage, dispatch, perPage, searchValue])


    /**
     * Method that find all students by lastname.
     * @param event
     */
    const findStudentsByLastname = (event) => {
        event.preventDefault();
        setSearchValue(event.target.value)
    }

    /**
     * Method that load needed student by id and open CreateUpdateModal with method update.
     * @param {number} id  - Student id
     */
    const editStudent = (id) => {
        dispatch(loadStudentById(id))
        setShowCreateUpdateModal(true);
        setMethod("update")
    }

    /**
     * Method that load needed student by id and open deleteModal.
     * @param {number} id - Student id
     */
    const deleteStudent = (id) => {
        dispatch(loadStudentById(id))
        setShowDeleteModal(true)
    }

    const showPageContent = () => {
        return (
            <div>
                {
                    students.length === 0 && searchValue === "" ?
                        <div>
                            <div style={{justifyContent: 'center', alignItems: 'center'}}>
                                <h1 className="text-center">
                                    <h1>Нет записей</h1>
                                    <Button
                                        variant="primary"
                                        size={"lg"}
                                        onClick={() => setShowCreateUpdateModal(true)}>Создать
                                    </Button>{' '}
                                </h1>
                            </div>
                        </div>
                        :
                        <div>
                            <Navbar bg="light" expand="lg">
                                <Container fluid>
                                    <Navbar.Collapse>
                                        <Button
                                            variant="primary"
                                            onClick={() => {
                                                setShowCreateUpdateModal(true);
                                                setMethod("create")
                                            }}>Создать</Button>
                                    </Navbar.Collapse>
                                    <Navbar.Collapse className="justify-content-end">
                                        <Form className="d-flex">
                                            <FormControl
                                                type="search"
                                                placeholder="Поиск"
                                                className="me-2"
                                                onChange={event => findStudentsByLastname(event)}
                                                aria-label="Search"
                                            />
                                        </Form>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            {showList()}
                        </div>
                }
            </div>
        )
    }

    const showPagination = () => {
        return (
            <div>
                <Row>
                    <Col lg={1}>
                        <Form.Control
                            as="select"
                            size="sm"
                            onChange={event => {
                                dispatch(setSizePage(event.target.value));
                                dispatch(setCurrentPage(1))
                            }}>
                            {
                                sizes.map((size, index) =>
                                    <option key={index} selected={perPage === size} value={size}>{size}</option>
                                )
                            }
                        </Form.Control>
                    </Col>
                    <Col lg={11}>
                        <div className="pages">
                            <Pagination size="sm">
                                <Pagination.Item
                                    disabled={currentPage === 1}
                                    onClick={() => dispatch(setCurrentPage(1))}>First
                                </Pagination.Item>
                                <Pagination.Item
                                    disabled={currentPage === 1}
                                    onClick={() => dispatch(setCurrentPage(currentPage - 1))}>Prev
                                </Pagination.Item>
                                {
                                    pages.map((page, index) =>
                                        <Pagination.Item
                                            key={index}
                                            activeLabel=''
                                            onClick={() => dispatch(setCurrentPage(page))}
                                            active={currentPage === page}>
                                            {page}
                                        </Pagination.Item>
                                    )
                                }
                                <Pagination.Item
                                    disabled={currentPage === totalPages}
                                    onClick={() => dispatch(setCurrentPage(currentPage + 1))}>Next
                                </Pagination.Item>
                                <Pagination.Item
                                    disabled={currentPage === totalPages}
                                    onClick={() => dispatch(setCurrentPage(totalPages))}>Last</Pagination.Item>
                            </Pagination>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

    const showList = () => {
        return (
            <div style={{textAlign: "center"}}>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Возраст</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        students.map(student =>
                            <tr key={student.id}>
                                <td><b>{student.firstname}</b></td>
                                <td><b>{student.lastname}</b></td>
                                <td><b>{student.age}</b></td>
                                <td>
                                    <Link to={{pathname: `student/${student.id}`}} className="my-link">
                                        <Button variant="success">Информация</Button>{' '}
                                    </Link>

                                    <Button variant="primary"
                                            onClick={() => editStudent(student.id)}>Редактировать</Button>{' '}
                                    <Button variant="danger" onClick={() => deleteStudent(student.id)}>Удалить</Button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
                {showPagination()}
            </div>
        )
    }

    return (
        <div>
            <Container fluid>
                {
                    showCreateUpdateModal === true ?
                        <div>
                            <CreateOrUpdateStudentModal
                                show={showCreateUpdateModal}
                                onHide={() => setShowCreateUpdateModal(false)}
                                method={method}
                            />
                        </div>
                        :
                        null
                }
                <DeleteStudentModal
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                />
                <h1 className={"text-center"} style={{marginBottom: "30px"}}>Список студентов</h1>
                <Row>
                    <Col lg={12}>
                        {
                            loading === false ?
                                <div>
                                    {showPageContent()}
                                </div>
                                :
                                <div>
                                    loading...
                                </div>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ListStudents
