import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
const UserTable = (props) => {
    const { listUser } = props
    return (
        <table className="table table-hover table-bordered ">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">User name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>

                {listUser.map((item, index) =>
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td>
                            <button className="btn btn-primary">View</button>
                            <button className="btn btn-warning mx-3">Update</button>
                            <button onClick={() => props.handleClickBtnDeleteUser(item)} className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default UserTable