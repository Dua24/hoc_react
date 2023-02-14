import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getAllQuiz, getAllUsers, postAssginQuiz2User } from '../../../services/apiServices';
import { toast } from 'react-toastify';

const AssignQuiz2User = (props) => {

    const [listQuiz, setListQuiz] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState({})

    const [listUser, setListUser] = useState([])
    const [selectedUser, setSelectedUser] = useState({})

    useEffect(() => {
        handleGetListAllQuiz()
        handleGetAllUser()
    }, [])

    const handleGetListAllQuiz = async () => {
        const res = await getAllQuiz()
        if (res && res.EC === 0) {
            let options = res.DT.map((quiz) => {
                return {
                    value: quiz.id,
                    label: `${quiz.id}:  ${quiz.name}`
                }
            })
            setListQuiz(options)
        }
    }

    const handleGetAllUser = async () => {
        const res = await getAllUsers()
        if (res && res.EC === 0) {
            let options = res.DT.map((user) => {
                return {
                    value: user.id,
                    label: `${user.id}:  ${user.username} - ${user.email}`
                }
            })
            setListUser(options)
        }
    }

    const handleAssignQuiz2User = async (quizId, userId) => {
        const res = await postAssginQuiz2User(quizId, userId)
        if (res && res.EC === 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="row">
            <div className="col-6 form-group">
                <label>Select Quiz</label>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>
            <div className="col-6 form-group">
                <label>Select User</label>
                <Select
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>

            <div className="mt-3">
                <button onClick={() => handleAssignQuiz2User(selectedQuiz.value, selectedUser.value)} className="btn btn-warning">ASSIGN</button>
            </div>
        </div>


    )
}

export default AssignQuiz2User