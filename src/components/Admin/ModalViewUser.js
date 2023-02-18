
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { updateUser } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import _ from "lodash"
import { useTranslation, Trans } from 'react-i18next';

const ModalViewUser = (props) => {
    const { show, setShow, dataUser } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("user")
    const [image, setImage] = useState("")
    const [imgPreview, setImgPreview] = useState("")
    const { t } = useTranslation();


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
                <Modal.Title>{t('admin.manageUser.modal.view&create&update.titleView')}</Modal.Title>
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
                            disabled
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">{t('admin.manageUser.modal.view&create&update.input2')}</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled

                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">{t('admin.manageUser.modal.view&create&update.input3')}</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">{t('admin.manageUser.modal.view&create&update.input4.title')}</label>
                        <select
                            className="form-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            disabled
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
                            // onChange={(e) => handlePreviewImg(e)}
                            disabled
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
            </Modal.Footer>
        </Modal>
    );
}

export default ModalViewUser