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


const postQuiz = (name, description, difficulty, quizImage) => {
    const data = new FormData()
    data.append('name', name)
    data.append('description', description)
    data.append('difficulty', difficulty)
    data.append('quizImage', quizImage)
    return axios.post('api/v1/quiz', data)
}

const postAssignQuizToUser = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user',
        {
            quizId,
            userId,
        })
}

const getAllQuiz = () => {
    return axios.get(`api/v1/quiz/all`)
}

const updateQuiz = (id, description, name, difficulty, quizImage) => {
    const data = new FormData()
    data.append('id', id)
    data.append('description', description)
    data.append('name', name)
    data.append('difficulty', difficulty)
    data.append('quizImage', quizImage)
    return axios.put('api/v1/quiz', data)
}
const deleteQuiz = (id) => {
    return axios.delete(`api/v1/quiz/${id}`)
}
const postQuestionforQuiz = (quiz_id, description, questionImage) => {
    const data = new FormData()
    data.append('quiz_id', quiz_id)
    data.append('description', description)
    data.append('questionImage', questionImage)
    return axios.post('api/v1/question', data)
}
const postAnswersforQuestion = (description, correct_answer, question_id) => {
    return axios.post('api/v1/answer', { description, correct_answer, question_id })
}

const postAssginQuiz2User = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', { quizId, userId })
}

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`)
}

const postUpSertQAforQuiz = (data) => {
    return axios.post('api/v1/quiz-upsert-qa', { ...data })
}

const logOut = (email, refresh_token) => {
    return axios.post('api/v1/logout', { email, refresh_token })
}

const getDashBoardOverview = () => {
    return axios.get('api/v1/overview')
}

const postRefreshToken = (email, refresh_token) => {
    return axios.post('api/v1/refresh-token',
        {
            email,
            refresh_token
        })
}

const updateProfile = (username, userImage) => {
    const data = new FormData()
    data.append('username', username)
    data.append('userImage', userImage)
    return axios.post('api/v1/profile', data)
}

const changePassword = (current_password, new_password) => {
    return axios.post('api/v1/change-password',
        {
            current_password,
            new_password
        })
}

const getHistory = () => {
    return axios.get('api/v1/history')
}

export {
    createUser, getAllUsers, deleteUser, updateUser, getUsersWithPaginate,
    login, register, getQuizByUser, getQuestionByQuizId, postSubmitQuiz,
    postQuiz, postAssignQuizToUser, getAllQuiz, updateQuiz, deleteQuiz,
    postQuestionforQuiz, postAnswersforQuestion, postAssginQuiz2User,
    getQuizWithQA, postUpSertQAforQuiz, logOut, getDashBoardOverview,
    postRefreshToken, updateProfile, changePassword, getHistory
} 