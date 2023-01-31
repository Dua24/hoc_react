
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../services/apiServices';
import { toast } from 'react-toastify';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataUser } = props
    const handleClose = () => {
        setShow(false)
    }

    const handleDeleteUser = async (dataUser) => {
        const res = await deleteUser(dataUser.id)
        if (res && res.EC === 0) {
            handleClose()
            toast(res.EM)
            props.setCurrentPage(1)
            await props.fetchListUserPaginate(1)
        } else {
            toast.error(res.EM)
        }
    }
    return (

        <Modal
            size="xl"
            show={show}
            onHide={handleClose}
            backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Modal Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Do you want to <span>delete</span> user email <span>{dataUser.email}</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => handleDeleteUser(dataUser)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteUser