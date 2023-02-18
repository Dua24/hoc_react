import { useState, useEffect } from "react"
import { FcPlus } from "react-icons/fc"
import { postQuiz, getAllQuiz } from "../../../services/apiServices"
import "./ManageQuizs.scss"
import { toast } from 'react-toastify';
import QuizTable from "./QuizTable";
import Accordion from 'react-bootstrap/Accordion';
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import QAQuiz from "./QAQuiz";
import AssignQuiz2User from "./AssignQuiz2User";
import { useTranslation, Trans } from 'react-i18next';

const ManageQuizs = (props) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [level, setLevel] = useState("EASY")
    const [image, setImage] = useState("")
    const [imgPreview, setImgPreview] = useState("")
    const [listAllQuiz, setListAllQuiz] = useState([])
    const [dataUpdateQuiz, setDataUpdateQuiz] = useState({})
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false)
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false)
    const { t } = useTranslation();

    useEffect(() => {
        handleGetListAllQuiz()
    }, [])

    const handleGetListAllQuiz = async () => {
        const res = await getAllQuiz()
        if (res && res.EC === 0) {
            setListAllQuiz(res.DT)
        }
    }

    const handlePreviewImg = (e) => {
        if (e.target && e.target.files[0]) {
            setImgPreview(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        }
    }

    const handleSaveQuiz = async () => {
        // validate
        if (!name || !description) {
            toast.error("Check name or description")
            return;
        }
        const res = await postQuiz(name, description, level, image)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName("")
            setDescription("")
            setLevel("EASY")
            setImage(null)
            setImgPreview("")
            await handleGetListAllQuiz()
        } else {
            toast.error(res.EM)
        }
    }

    const handleClickBtnUpdateQuiz = (quiz) => {
        setShowModalUpdateQuiz(true)
        setDataUpdateQuiz({
            id: quiz.id,
            name: quiz.name,
            description: quiz.description,
            difficulty: quiz.difficulty,
            quizImage: quiz.image
        })
    }

    const handleClickBtnDeleteQuiz = (quizId) => {
        setShowModalDeleteQuiz(true)
        setDataUpdateQuiz({ id: quizId })

    }

    return (
        <div className="manage-quizs-container">
            <div className="title"></div>
            <div className="manage-quizs-content">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>{t('admin.manageQuiz.label1.title')}</Accordion.Header>
                        <Accordion.Body>
                            <fieldset className="border rounded-3 p-3 row" legend="true" >
                                <legend className="float-none w-auto px-3 ">{t('admin.manageQuiz.label1.header')}</legend>
                                <div className="control-group col-12">
                                    <label className="form-label mb-1">{t('admin.manageQuiz.label1.input1')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="control-group col-12">
                                    <label className="form-label mb-1">{t('admin.manageQuiz.label1.input2')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <div className="control-group col-12">
                                    <label className="form-label mb-1">{t('admin.manageQuiz.label1.input3.title')}</label>
                                    <select
                                        className="form-select"
                                        value={level}
                                        onChange={(e) => setLevel(e.target.value)}
                                    >
                                        <option value="EASY">{t('admin.manageQuiz.label1.input3.value1')}</option>
                                        <option value="MEDIUM">{t('admin.manageQuiz.label1.input3.value2')}</option>
                                        <option value="HARD">{t('admin.manageQuiz.label1.input3.value3')}</option>
                                    </select>
                                </div>
                                <div className="control-group col-3">
                                    <label htmlFor="imgPre" className="form-label mb-1 imgPreLable"><FcPlus /> {t('admin.manageQuiz.label1.input4')}</label>
                                    <input
                                        id="imgPre"
                                        hidden type="file"
                                        onChange={(e) => handlePreviewImg(e)}
                                    />
                                </div>

                                <div className="mb-5 img-preview-input col-12">

                                    {imgPreview ? <img src={imgPreview} /> : <span>{t('admin.manageQuiz.label1.input5')}</span>}

                                </div>
                                <div>
                                    <button onClick={() => handleSaveQuiz()} className="btn btn-warning">{t('admin.manageQuiz.label1.btnSave')}</button>
                                </div>
                            </fieldset>
                            <div className="quiz-table">
                                <QuizTable
                                    listAllQuiz={listAllQuiz}
                                    handleClickBtnUpdateQuiz={handleClickBtnUpdateQuiz}
                                    handleClickBtnDeleteQuiz={handleClickBtnDeleteQuiz}
                                />
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>{t('admin.manageQuiz.label2.title')}</Accordion.Header>
                        <Accordion.Body>
                            <QAQuiz />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>{t('admin.manageQuiz.label3.title')}</Accordion.Header>
                        <Accordion.Body>
                            <AssignQuiz2User />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

            <ModalUpdateQuiz
                dataUpdateQuiz={dataUpdateQuiz}
                setDataUpdateQuiz={setDataUpdateQuiz}
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                handleGetListAllQuiz={handleGetListAllQuiz}
            />
            <ModalDeleteQuiz
                dataUpdateQuiz={dataUpdateQuiz}
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                handleGetListAllQuiz={handleGetListAllQuiz}
            />

        </div>
    )
}

export default ManageQuizs