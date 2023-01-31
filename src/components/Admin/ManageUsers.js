import { useState, useEffect } from "react"
import UserTable from "./UserTable"
import { getAllUsers } from "../../services/apiServices"
import ModalCreateUser from "./ModalCreateUser"
import ModalDeleteUser from "./ModalDeleteUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import UserTablePaginate from "./UserTablePaginate";
import { getUsersWithPaginate } from "../../services/apiServices"

const ManageUsers = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [showModalViewUser, setShowModalViewUser] = useState(false)
    const [dataUpdateUser, setDataUpdateUser] = useState({})
    const [dataDeleteUser, setDataDeleteUser] = useState({})
    const [listUser, setListUser] = useState([])
    const [pageCount, setPageCount] = useState(1)
    const USER_LIMIT = 3
    const [currentPage, setCurrentPage] = useState(1)


    useEffect(() => {
        // fetchListUser()
        fetchListUserPaginate(1)
    }, [])

    const fetchListUser = async () => {
        const res = await getAllUsers()
        if (res && res.EC === 0) {
            setListUser(res.DT)
        }
    }

    const fetchListUserPaginate = async (page) => {
        const res = await getUsersWithPaginate(page, USER_LIMIT)
        if (res && res.EC === 0) {
            setListUser(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }

    const handleClickBtnDeleteUser = (user) => {
        setShowModalDeleteUser(true)
        setDataDeleteUser(user)
    }
    const handleClickBtnUpdateUser = (user) => {
        setDataUpdateUser(user)
        setShowModalUpdateUser(true)
    }
    const handleClickBtnViewUser = (user) => {
        setShowModalViewUser(true)
        setDataUpdateUser(user)
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
                        {/* <UserTable
                            listUser={listUser}
                            handleClickBtnDeleteUser={handleClickBtnDeleteUser}
                            handleClickBtnUpdateUser={handleClickBtnUpdateUser}
                            handleClickBtnViewUser={handleClickBtnViewUser}
                        /> */}
                        <UserTablePaginate
                            listUser={listUser}
                            handleClickBtnDeleteUser={handleClickBtnDeleteUser}
                            handleClickBtnUpdateUser={handleClickBtnUpdateUser}
                            handleClickBtnViewUser={handleClickBtnViewUser}
                            fetchListUserPaginate={fetchListUserPaginate}
                            pageCount={pageCount}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>


                </div>

                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUserPaginate={fetchListUserPaginate}
                    setCurrentPage={setCurrentPage}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    fetchListUserPaginate={fetchListUserPaginate}
                    dataUser={dataDeleteUser}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}

                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    fetchListUserPaginate={fetchListUserPaginate}
                    dataUpdateUser={dataUpdateUser}
                    setDataUpdateUser={setDataUpdateUser}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataUser={dataUpdateUser}
                />
            </div>
        </>
    )
}

export default ManageUsers