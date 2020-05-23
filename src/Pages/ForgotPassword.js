import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputField from '../Components/InputField';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    return (
        <div className="register">
            <h1>Reset Password</h1>
            <div className="container">
                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Email must be present'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <InputField name="email" label="Enter your email." error={touched.email && errors.email} type="email" />
                            <button type="submit" className="btn btn-primary">Send reset link</button>

                        </Form>)}
                </Formik>
            </div>
        </div>
    )
}

export default ForgotPassword
