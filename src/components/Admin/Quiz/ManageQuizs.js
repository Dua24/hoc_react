import { useState, useEffect } from "react"
import { FcPlus } from "react-icons/fc"
import { postQuiz, getAllQuiz } from "../../../services/apiServices"
import "./ManageQuizs.scss"
import { toast } from 'react-toastify';
import QuizTable from "./QuizTable";
import Accordion from 'react-bootstrap/Accordion';
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";

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
            console.log(res)
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
                        <Accordion.Header>Manage Quizzes</Accordion.Header>
                        <Accordion.Body>
                            <fieldset className="border rounded-3 p-3 row" legend="true" >
                                <legend className="float-none w-auto px-3 ">Create Quiz</legend>
                                <div className="control-group col-12">
                                    <label className="form-label mb-1">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="control-group col-12">
                                    <label className="form-label mb-1">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <div className="control-group col-12">
                                    <label className="form-label mb-1">Level</label>
                                    <select
                                        className="form-select"
                                        value={level}
                                        onChange={(e) => setLevel(e.target.value)}
                                    >
                                        <option value="EASY">Easy</option>
                                        <option value="MEDIUM">Medium</option>
                                        <option value="HARD">Hard</option>
                                    </select>
                                </div>
                                <div className="control-group col-3">
                                    <label htmlFor="imgPre" className="form-label mb-1 imgPreLable"><FcPlus /> Upload File Image</label>
                                    <input
                                        id="imgPre"
                                        hidden type="file"
                                        onChange={(e) => handlePreviewImg(e)}
                                    />
                                </div>

                                <div className="mb-5 img-preview-input col-12">

                                    {imgPreview ? <img src={imgPreview} /> : <span>Preview image</span>}

                                </div>
                                <div>
                                    <button onClick={() => handleSaveQuiz()} className="btn btn-warning">Save</button>
                                </div>
                            </fieldset>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            <div className="quiz-table">
                <QuizTable
                    listAllQuiz={listAllQuiz}
                    handleClickBtnUpdateQuiz={handleClickBtnUpdateQuiz}
                    handleClickBtnDeleteQuiz={handleClickBtnDeleteQuiz}
                />
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