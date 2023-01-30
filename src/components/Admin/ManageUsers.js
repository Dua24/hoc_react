import { useState } from "react"
import ModalCreateUser from "./ModalCreateUser"

const ManageUsers = (props) => {
    const [show, setShow] = useState(false)
    return (
        <>
            <div className="manageUser-container">
                <div className="title">Manage USer</div>
                <div className="users-content">
                    <div>
                        <button onClick={() => setShow(true)} className="btn btn-primary">Add new User</button>
                    </div>

                </div>
                <ModalCreateUser
                    show={show}
                    setShow={setShow}
                />
            </div>
        </>
    )
}

export default ManageUsers