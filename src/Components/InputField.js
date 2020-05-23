import React from 'react'
import { Field } from 'formik';

function InputField({ name, type, label, error }) {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <Field name={name} type={type} className={"form-control " + (error ? "has-error" : "")} />
            {error && <div className="invalid-feedback d-block" >
                {error}
            </div>}
        </div>
    )
}

export default InputField
