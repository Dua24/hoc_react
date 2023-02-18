
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import _ from "lodash"
import { updateQuiz } from '../../../services/apiServices';
import { useTranslation, Trans } from 'react-i18next';

const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdateQuiz } = props
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [difficulty, setDifficulty] = useState("EASY")
    const [image, setImage] = useState("")
    const [imgPreview, setImgPreview] = useState("")
    const { t } = useTranslation();

    const handlePreviewImg = (e) => {
        if (e.target && e.target.files[0]) {
            setImgPreview(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        }
    }

    useEffect(() => {
        if (!_.isEmpty(dataUpdateQuiz)) {
            setName(dataUpdateQuiz.name)
            setDescription(dataUpdateQuiz.description)
            setDifficulty(dataUpdateQuiz.difficulty)
            // set img base64
            if (dataUpdateQuiz.quizImage) {
                setImgPreview(`data:image/png;base64,${dataUpdateQuiz.quizImage}`)
            }
        }
    }, [dataUpdateQuiz])


    const handleClose = () => {
        setShow(false)
        setName("")
        setDescription("")
        setDifficulty("EASY")
        setImage("")
        setImgPreview("")
        props.setDataUpdateQuiz({})

    }

    const handleUpdateQuiz = async () => {
        const res = await updateQuiz(dataUpdateQuiz.id, description, name, difficulty, image)
        if (res && res.EC === 0) {
            handleClose()
            toast.success(res.EM)
            await props.handleGetListAllQuiz()
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
                <Modal.Title>Modal Update Quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}

                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Difficulty</label>
                        <select
                            className="form-select"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                        >
                            <option value="EASY">Easy</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HARD">Hard</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="imgPre" className="form-label imgPreLable"><FcPlus /> Upload File Image</label>
                        <input
                            id="imgPre"
                            hidden type="file"
                            onChange={(e) => handlePreviewImg(e)}
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
                <Button variant="primary" onClick={() => handleUpdateQuiz()}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalUpdateQuiz