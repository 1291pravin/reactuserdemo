import React, { useState } from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../Components/InputField';
import { callLoginApi } from '../Functions/User';
import { Redirect } from 'react-router-dom';
import Message from '../Components/Message';


function Login({ setisLogedIn }) {
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState("");
    const [navigate, setNavigate] = useState(false);

    if (navigate) {
        return <Redirect to={"/user/profile/" + localStorage.getItem("id")} />
    }


    return (
        <div className="register">
            <h1>Login</h1>
            <div className="container">
                {isSuccess && <Message type="success" message="You have logged in successfully. Redirecting to Profile." />}
                {errors && <Message type="danger" message={errors} />}
                <Formik
                    initialValues={{ password: '', username: '' }}
                    validationSchema={Yup.object({
                        password: Yup.string()
                            .min(8, 'Password Must be at least 8 characters')
                            .required('Required'),
                        username: Yup.string()
                            .required('Username must be present'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        const [response, apiErrors] = await callLoginApi(values);
                        if (response) {
                            localStorage.setItem("id", response.id);
                            setisLogedIn(response.id);
                            setErrors("");
                            setIsSuccess(true);
                            setTimeout(() => {
                                setNavigate(true);
                            }, 2000);
                        } else {
                            setErrors(apiErrors);
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <InputField name="username" label="Enter your Username." error={touched.username && errors.username} type="text" />
                            <InputField name="password" label="Enter your Password." error={touched.password && errors.password} type="password" />
                            <button type="submit" className="btn btn-primary">Login</button>

                        </Form>)}
                </Formik>
            </div>
        </div>
    )
}

export default Login
