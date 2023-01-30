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
export { createUser, getAllUsers, deleteUser } 