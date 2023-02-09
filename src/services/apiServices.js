import axios from "../utils/axiosCustomize"
const getAllUsers = () => {
    return axios.get('api/v1/participant/all')
}
const createUser = (email, password, username, role, userImage) => {
    const data = new FormData()
    data.append('email', email)
    data.append('password', password)
    data.append('username', username)
    data.append('role', role)
    data.append('userImage', userImage)
    return axios.post('api/v1/participant', data)
}

const deleteUser = (id) => {
    return axios.delete('api/v1/participant', { data: { id: id } })
}

const updateUser = (id, username, role, userImage) => {
    const data = new FormData()
    data.append('id', id)
    data.append('username', username)
    data.append('role', role)
    data.append('userImage', userImage)
    return axios.put('api/v1/participant', data) // truyen form data
}
const getUsersWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const login = (email, password) => {
    return axios.post('api/v1/login',
        {
            email,
            password,
            delay: 2000
        }) // <-- truyen theo form-urlencoded
}
const register = (email, username, password) => {
    return axios.post('api/v1/register', { email, username, password })
}

const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant')
}

const getQuestionByQuizId = (quizId) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`)
}

const postSubmitQuiz = (data) => {
    return axios.post(`api/v1/quiz-submit`, { ...data }) //<-- truyen theo row
}
export { createUser, getAllUsers, deleteUser, updateUser, getUsersWithPaginate, login, register, getQuizByUser, getQuestionByQuizId, postSubmitQuiz } 