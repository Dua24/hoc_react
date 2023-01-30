import { useState, useEffect } from "react"
import ModalCreateUser from "./ModalCreateUser"
import UserTable from "./UserTable"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllUsers } from "../../services/apiServices"
import ModalDeleteUser from "./ModalDeleteUser";

const ManageUsers = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [dataDeleteUser, setDataDeleteUser] = useState({})
    const [listUser, setListUser] = useState([])
    useEffect(() => {
        fetchListUser()
    }, [])

    const fetchListUser = async () => {
        const res = await getAllUsers()
        if (res && res.EC === 0) {
            setListUser(res.DT)
        }
    }
    const handleClickBtnDeleteUser = (user) => {
        setShowModalDeleteUser(true)
        setDataDeleteUser(user)
    }
    return (
        <>
            <div className="manageUser-container">
                <div className="title">Manage USer</div>
                <div className="users-content">
                    <div>
                        <button onClick={() => setShowModalCreateUser(true)} className="btn btn-primary">Add new User</button>
                    </div>
                    <div>
                        <UserTable
                            listUser={listUser}
                            handleClickBtnDeleteUser={handleClickBtnDeleteUser}
                        />
                    </div>


                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUser}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    fetchListUser={fetchListUser}
                    dataDeleteUser={dataDeleteUser}
                />
            </div>
        </>
    )
}

export default ManageUsers