import axios from 'axios';
const BASE_URL = 'http://localhost:8000/';

const formatError = (error) => {
    let apiError = "";
    for (const property in error.response.data) {
        for (const localError of error.response.data[property]) {
            apiError += localError + "<br/>";
        }
    }
    return apiError;
}

export const callRegisterApi = async (formData) => {
    let data = {
        username: formData.name,
        password: formData.password,
        email: formData.email,
        contact: formData.contact
    }
    try {
        await axios.post(BASE_URL + 'user/register', data);
        return [true, ""];
    }
    catch (error) {
        const apiError = formatError(error);
        return [false, apiError];
    }
}

export const callLoginApi = async ({ username, password }) => {
    let data = {
        username: username,
        password: password,
    }
    try {
        const response = await axios.post(BASE_URL + 'user/login', data);
        return [response.data, ""];
    }
    catch (error) {
        const apiError = formatError(error);
        return [false, apiError];
    }
}

export const callProfileApi = async (id) => {
    try {
        const response = await axios.get(BASE_URL + 'user/profile/' + id);
        return [response.data, ""];
    }
    catch (error) {
        const apiError = formatError(error);
        return [false, apiError];
    }
}

