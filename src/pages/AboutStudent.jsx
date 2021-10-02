import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {loadStudentById} from "../redux/Action";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

function AboutStudent(props) {

    const dispatch = useDispatch()
    const student = useSelector(state => state.dataOfStudents.student)
    const loading = useSelector(state => state.dataOfStudents.loading)

    useEffect(() => {
        dispatch(loadStudentById(props.match.params.id))
    }, [dispatch, props.match.params.id])

    return (
        <div>
            <h1 className={"text-center"}>О студенте</h1>
            {
                loading === false ?
                    <Container style={{width: "100%", whiteSpace: "nowrap"}}>
                        <Row>
                            <Col lg={2}>
                                <h2>{student.firstname} {student.lastname}</h2>
                                <h2>Возраст: {student.age}</h2>
                            </Col>
                            <Col lg={10}> <Link to={{pathname: `/`}} className="my-link">
                                <Button size={"lg"} style={{width: "150px", height: "80px"}}
                                        variant="danger">Назад</Button>
                            </Link>
                            </Col>
                        </Row>
                    </Container>
                    :
                    <div>
                        loading...
                    </div>
            }
        </div>
    );
}

export default AboutStudent