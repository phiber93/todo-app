import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import moment from "moment"

export default function TodoComponent() {

    const [description, setDescription] = useState("")
    const [targetDate, setTargetDate] = useState("")

    const { id } = useParams()

    const authContext = useAuth()

    const navigate = useNavigate()

    const username = authContext.username

    useEffect(
        () => retrieveTodo
    )

    function retrieveTodo() {

        if (id !== "-1") {
            retrieveTodoApi(username, id)
                .then(response => {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                })
                .catch(error => console.log(error))
        }
    }

    function onSubmit(values) {
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }

        if (id === "-1") {
            createTodoApi(username, todo)
                .then(() => {
                    navigate("/todos")
                })
                .catch(error => console.log(error))
        } else {
            updateTodoApi(username, id, todo)
                .then(() => {
                    navigate("/todos")
                })
                .catch(error => console.log(error))
        }
    }

    function validate(values) {
        let errors = {}

        if (values.description.length < 5) {
            errors.description = "Enter at least 5 Characters"
        }

        if (values.targetDate === "" || values.targetDate == null || moment(values.targetDate).isValid()) {
            errors.description = "Enter a target date"
        }

        return errors
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={{ description, targetDate }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}>
                    {
                        (props) => (

                            <Form>
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="alert alert-warning"
                                />

                                <ErrorMessage
                                    name="targetDate"
                                    component="div"
                                    className="alert alert-warning"
                                />

                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate" />
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>

            </div>
        </div>
    )
}