
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { useTranslation, Trans } from 'react-i18next';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataUser } = props
    const { t } = useTranslation();

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
                <Modal.Title>{t('admin.manageUser.modal.delete.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {t('admin.manageUser.modal.delete.body.text1')} <span style={{ fontWeight: "bold" }}>{t('admin.manageUser.modal.delete.body.text2')}</span> {t('admin.manageUser.modal.delete.body.text3')} <span style={{ color: "red", fontWeight: "bold" }}>{dataUser.email}</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t('admin.manageUser.modal.delete.body.btnClose')}
                </Button>
                <Button variant="danger" onClick={() => handleDeleteUser(dataUser)}>
                    {t('admin.manageUser.modal.delete.body.btnDelete')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteUser