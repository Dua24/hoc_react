
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { useTranslation, Trans } from 'react-i18next';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./Profile.scss"
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { updateProfile, changePassword, getHistory } from '../../../services/apiServices';
import moment from "moment";
import _ from "lodash"
const ModalProfile = (props) => {
    const { isAuthenticated, account } = useSelector(state => state.user)
    const { show, setShow } = props
    const [username, setUsername] = useState("")
    const [image, setImage] = useState("")
    const [imgPreview, setImgPreview] = useState("")

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [currentTab, setCurrentTab] = useState("userInfo")

    const [dataHistory, setDataHistory] = useState([])

    const { t } = useTranslation();
    const handlePreviewImg = (e) => {
        if (e.target && e.target.files[0]) {
            setImgPreview(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        }
    }
    const handleClose = () => {
        setShow(false)
    }


    useEffect(() => {
        if (account && account.image) {
            setUsername(account.username)
            setImgPreview(`data:image/png;base64, ${account.image}`)
            setImage(account.image)
        }
    }, [account])


    useEffect(() => {
        fetchHistory()
    }, [])


    const fetchHistory = async () => {
        const res = await getHistory()
        if (res && res.EC == 0) {
            setDataHistory(res.DT.data.splice(0, 7))
        }
    }

    const handleUpdateProfile = async () => {
        let res;
        switch (currentTab) {
            case "userInfo":
                res = await updateProfile(username, image)
                break;
            case "changePassword":
                if (confirmPass === newPassword) {
                    res = await changePassword(currentPassword, newPassword)
                } else {
                    toast.error("Invalid confirm password");
                    return;
                }
            default:
                toast.error("Invalid eventkey is selected");
                return;
        }
        if (res && res.EC == 0) {
            toast.success(res.EM);
        } else {
            toast.error(res.EM)
        }
        handleClose()

    }
    return (

        <Modal
            size="xl"
            show={show}
            onHide={handleClose}
            backdrop="static"
            className="ProfileModal"
        >

            <Modal.Header closeButton>
                <Modal.Title>{t('admin.manageUser.modal.view&create&update.titleCreate')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs
                    defaultActiveKey="userInfo"
                    id="uncontrolled-tab-example"
                    className="mb-3 tabsProfile"
                    variant="pills"
                    onSelect={(e) => setCurrentTab(e)}
                    justify
                >
                    <Tab eventKey="userInfo" title="User Info">
                        <form className="row g-3">
                            <div className="col-md-4">
                                <label className="form-label">UserName</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    defaultValue={account.email}
                                    disabled

                                />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">{t('admin.manageUser.modal.view&create&update.input4.title')}</label>
                                <select
                                    className="form-select"
                                    defaultValue={account.role}
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
                                    onChange={(e) => handlePreviewImg(e)}

                                />
                            </div>

                            <div className="img-preview-input col-12">

                                {imgPreview ? <img src={imgPreview} /> : <span>{t('admin.manageUser.modal.view&create&update.input6')}</span>}

                            </div>
                        </form>
                    </Tab>
                    <Tab eventKey="changePassword" title="Change Password">
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Old password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">New pass</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Confirm pass</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={confirmPass}
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                />
                            </div>
                        </form>
                    </Tab>
                    <Tab eventKey="contact" title="Contact">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Quiz Name</th>
                                    <th scope="col">Total Question</th>
                                    <th scope="col">Total Correct</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataHistory.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.quizHistory.name}</td>
                                            <td>{item.total_questions}</td>
                                            <td>{item.total_correct}</td>
                                            <td>{moment(item.createdAt).utc().format("YYYY-MM-DD HH:mm:ss A")}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t('admin.manageUser.modal.view&create&update.btnClose')}
                </Button>
                <Button variant="warning" onClick={() => handleUpdateProfile()} >
                    Update
                </Button>
            </Modal.Footer>
        </Modal >
    );
}

export default ModalProfile