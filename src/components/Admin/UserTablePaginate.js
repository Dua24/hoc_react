import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { } from "react-router-dom";
import { useTranslation, Trans } from 'react-i18next';

const UserTablePaginate = (props) => {
    const { listUser, currentPage, setCurrentPage, pageCount } = props
    const { t } = useTranslation();

    const handlePageClick = (event) => {
        props.fetchListUserPaginate(+event.selected + 1)
        setCurrentPage(+event.selected + 1)
    };
    return (
        <>
            <table className="table table-hover table-bordered ">
                <thead>
                    <tr>
                        <th scope="col">{t('admin.manageUser.tableUser.thead.col1')}</th>
                        <th scope="col">{t('admin.manageUser.tableUser.thead.col2')}</th>
                        <th scope="col">{t('admin.manageUser.tableUser.thead.col3')}</th>
                        <th scope="col">{t('admin.manageUser.tableUser.thead.col4')}</th>
                        <th scope="col">{t('admin.manageUser.tableUser.thead.col5')}</th>
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
                                <button onClick={() => props.handleClickBtnViewUser(item)} className="btn btn-primary">{t('admin.manageUser.tableUser.tbody.btnView')}</button>
                                <button onClick={() => props.handleClickBtnUpdateUser(item)} className="btn btn-warning mx-3">{t('admin.manageUser.tableUser.tbody.btnUpdate')}</button>
                                <button onClick={() => props.handleClickBtnDeleteUser(item)} className="btn btn-danger">{t('admin.manageUser.tableUser.tbody.btnDelete')}</button>
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