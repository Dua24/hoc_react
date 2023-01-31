import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { } from "react-router-dom";

const UserTablePaginate = (props) => {
    const { listUser, currentPage, setCurrentPage, pageCount } = props
    const handlePageClick = (event) => {
        props.fetchListUserPaginate(+event.selected + 1)
        setCurrentPage(+event.selected + 1)
    };
    return (
        <>
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
                                <button onClick={() => props.handleClickBtnViewUser(item)} className="btn btn-primary">View</button>
                                <button onClick={() => props.handleClickBtnUpdateUser(item)} className="btn btn-warning mx-3">Update</button>
                                <button onClick={() => props.handleClickBtnDeleteUser(item)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={currentPage - 1}
            />
        </>
    )
}

export default UserTablePaginate