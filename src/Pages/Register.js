import React, { useState } from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../Components/InputField';
import { callRegisterApi } from '../Functions/User';
import { Redirect } from 'react-router-dom';
import Message from '../Components/Message';






function Register() {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState("");
    const [navigate, setNavigate] = useState(false);

    if (navigate) {
        return <Redirect to="/login" />
    }

    return (
        <div className="register">
            <h1>Sign Up</h1>
            <div className="container">

                {isSuccess && <Message type="success" message="You have registered successfully. Redirecting to Login." />}
                {errors && <Message type="danger" message={errors} />}

                <Formik
                    initialValues={{ name: 'Pravin', password: 'test@123', cnfpassword: 'test@123', email: 'test@test.com', contact: '1234567890' }}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .required('Name must be present'),
                        password: Yup.string()
                            .min(8, 'Password Must be at least 8 characters')
                            .required('Required'),
                        cnfpassword: Yup.string()
                            .required('Required')
                            .test('passwords-match', 'Confirm Password must be same as Password', function (value) {
                                return this.parent.password === value;
                            })
                        ,
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Email must be present'),
                        contact: Yup.string()
                            .required('Contact Number is required')
                            .min(10, 'Password Must be of 10 digits')
                            .max(10, 'Password Must be of 10 digits')
                            .matches(phoneRegExp, 'Phone number is not valid')
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        const [success, apiErrors] = await callRegisterApi(values);
                        if (success) {
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
                            <InputField name="name" label="Enter your user name." error={touched.name && errors.name} type="text" />
                            <InputField name="email" label="Enter your email." error={touched.email && errors.email} type="email" />
                            <InputField name="contact" label="Enter your 10 Digit Mobile Number." error={touched.contact && errors.contact} type="text" />
                            <InputField name="password" label="Choose a password with at least 8 characters." error={touched.password && errors.password} type="password" />
                            <InputField name="cnfpassword" label="Confirm password." error={touched.cnfpassword && errors.cnfpassword} type="password" />
                            <button type="submit" className="btn btn-primary">Continue</button>
                        </Form>)}
                </Formik>
            </div>
        </div >
    )
}

export default Register
