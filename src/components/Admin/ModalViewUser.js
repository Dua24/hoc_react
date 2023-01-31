
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { updateUser } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import _ from "lodash"

const ModalViewUser = (props) => {
    const { show, setShow, dataUser } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("user")
    const [image, setImage] = useState("")
    const [imgPreview, setImgPreview] = useState("")


    useEffect(() => {
        if (!_.isEmpty(dataUser)) {
            setEmail(dataUser.email)
            setUsername(dataUser.username)
            setRole(dataUser.role)
            // set img base64
            if (dataUser.image) {
                setImgPreview(`data:image/png;base64,${dataUser.image}`)
            }
        }
    }, [dataUser])

    const handleClose = () => {
        setShow(false)
    }



    return (

        <Modal
            size="xl"
            show={show}
            onHide={handleClose}
            backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Modal View User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled

                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">User name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Role</label>
                        <select
                            className="form-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            disabled
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="imgPre" className="form-label imgPreLable"><FcPlus /> Upload File Image</label>
                        <input
                            id="imgPre"
                            hidden type="file"
                            // onChange={(e) => handlePreviewImg(e)}
                            disabled
                        />
                    </div>

                    <div className="img-preview-input col-12">

                        {imgPreview ? <img src={imgPreview} /> : <span>Preview image</span>}

                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalViewUser