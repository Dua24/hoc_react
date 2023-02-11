
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuiz } from '../../../services/apiServices';
import { toast } from 'react-toastify';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataUpdateQuiz } = props
    const handleClose = () => {
        setShow(false)
    }

    const handleDeleteUser = async (dataUpdateQuiz) => {
        const res = await deleteQuiz(dataUpdateQuiz.id)
        if (res && res.EC === 0) {
            handleClose()
            toast(res.EM)
            props.handleGetListAllQuiz()
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
                <Modal.Title>Modal Delete Quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Do you want to <span>delete</span> Quiz ID <span>{dataUpdateQuiz.id}</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => handleDeleteUser(dataUpdateQuiz)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteQuiz