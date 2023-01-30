
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { deleteUser } from '../../services/apiServices';
import { toast } from 'react-toastify';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDeleteUser } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("user")
    const [image, setImage] = useState("")
    const [imgPreview, setImgPreview] = useState("")

    const handleClose = () => {
        setShow(false)
        setEmail("")
        setPassword("")
        setUsername("")
        setRole("user")
        setImage("")
        setImgPreview("")
    }

    const handleDeleteUser = async (dataDeleteUser) => {
        const res = await deleteUser(dataDeleteUser.id)
        if (res && res.EC === 0) {
            handleClose()
            toast(res.EM)
            await props.fetchListUser()
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
                Do you want to <span>delete</span> user email <span>{dataDeleteUser.email}</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => handleDeleteUser(dataDeleteUser)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteUser