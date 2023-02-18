
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { createUser } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { useTranslation, Trans } from 'react-i18next';

const ModalCreateUser = (props) => {
    const { show, setShow } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("user")
    const [image, setImage] = useState("")
    const [imgPreview, setImgPreview] = useState("")
    const { t } = useTranslation();

    const handlePreviewImg = (e) => {
        if (e.target && e.target.files[0]) {
            setImgPreview(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        }
    }
    const handleClose = () => {
        setShow(false)
        setEmail("")
        setPassword("")
        setUsername("")
        setRole("user")
        setImage("")
        setImgPreview("")
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleCreateUser = async () => {
        if (!validateEmail(email)) {
            toast.error("Invalid Email")
            return;
        }
        if (password.length < 6) {
            toast.error("Invalid Password")
            return;
        }

        const res = await createUser(email, password, username, role, image)
        if (res && res.EC === 0) {
            handleClose()
            toast.success(res.EM)
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
                <Modal.Title>{t('admin.manageUser.modal.view&create&update.titleCreate')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">{t('admin.manageUser.modal.view&create&update.input1')}</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">{t('admin.manageUser.modal.view&create&update.input2')}</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">{t('admin.manageUser.modal.view&create&update.input3')}</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">{t('admin.manageUser.modal.view&create&update.input4.title')}</label>
                        <select
                            className="form-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="user">{t('admin.manageUser.modal.view&create&update.input4.value1')}</option>
                            <option value="admin">{t('admin.manageUser.modal.view&create&update.input4.value2')}</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="imgPre" className="form-label imgPreLable"><FcPlus /> {t('admin.manageUser.modal.view&create&update.input5')}</label>
                        <input
                            id="imgPre"
                            hidden type="file"
                            onChange={(e) => handlePreviewImg(e)}
                        />
                    </div>

                    <div className="img-preview-input col-12">

                        {imgPreview ? <img src={imgPreview} /> : <span>{t('admin.manageUser.modal.view&create&update.input6')}</span>}

                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t('admin.manageUser.modal.view&create&update.btnClose')}
                </Button>
                <Button variant="primary" onClick={() => handleCreateUser()}>
                    {t('admin.manageUser.modal.view&create&update.btnCreate')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalCreateUser