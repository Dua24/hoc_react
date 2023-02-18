import { useEffect, useState } from 'react';
import Select from 'react-select';
import "./QAQuiz.scss"
import { BsFillPatchPlusFill, BsPatchMinusFill } from "react-icons/bs"
import { AiFillPlusSquare, AiOutlineMinusCircle } from 'react-icons/ai';
import { BiImageAdd } from "react-icons/bi"
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash"
import Lightbox from "react-awesome-lightbox";
import {
    getAllQuiz, getQuizWithQA,
    postUpSertQAforQuiz
}
    from "../../../services/apiServices";
import { toast } from 'react-toastify';
import { useTranslation, Trans } from 'react-i18next';

const QAQuiz = (props) => {
    const initListuestions = [
        {
            id: uuidv4(),
            description: "",
            imageFile: "",
            imageName: "",
            answers: [
                {
                    id: uuidv4(),
                    description: "",
                    isCorrect: false
                }
            ]
        }
    ]
    const { t } = useTranslation();

    const [selectedQuiz, setSelectedQuiz] = useState({})

    const [listQuestion, setListQuestion] = useState(initListuestions)

    const [previewImg, setPreviewImg] = useState(false)
    const [dataPreviewImg, setDataPreviewImg] = useState({})
    const [listQuiz, setListQuiz] = useState([])

    useEffect(() => {
        handleGetListAllQuiz()
    }, [])

    useEffect(() => {
        fetchGetQuizWithQA()
    }, [selectedQuiz])

    //return a promise that resolves with a File instance
    const urltoFile = (url, filename, mimeType) => {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        );
    }


    const fetchGetQuizWithQA = async () => {
        if (selectedQuiz && selectedQuiz.value) {
            const newData = []
            const res = await getQuizWithQA(selectedQuiz.value)
            if (res.EC === 0) {
                if (res.DT.qa && res.DT.qa.length !== 0) {
                    for (let i = 0; i < res.DT.qa.length; i++) {
                        if (res.DT.qa[i].imageFile) {
                            res.DT.qa[i].imageFile = await urltoFile(`data:image/png;base64,${res.DT.qa[i].imageFile}`, `q'Img-${res.DT.qa[i].id}`, 'image/jpg')
                            res.DT.qa[i].imageName = `Q's Imgage-${res.DT.qa[i].id}`
                        }
                        newData.push(res.DT.qa[i])
                    }
                    setListQuestion(newData)
                } else {
                    setListQuestion(initListuestions)
                }

            }
        }


    }

    const handleGetListAllQuiz = async () => {
        const res = await getAllQuiz()
        if (res && res.EC === 0) {
            let options = res.DT.map((quiz) => {
                return {
                    value: quiz.id,
                    label: `${quiz.id}:  ${quiz.name}`
                }
            })
            setListQuiz(options)
        }
    }



    const handleAddDeleteQuestion = (type, id) => {
        if (type === "ADD") {
            const newQuestion = {
                id: uuidv4(),
                description: "",
                imageFile: "",
                answers: [
                    {
                        id: uuidv4(),
                        description: "",
                        isCorrect: false
                    }
                ]
            }
            setListQuestion([...listQuestion, newQuestion])
        } else if (type === "DELETE") {
            let cloneListQuestion = _.cloneDeep(listQuestion)
            cloneListQuestion = cloneListQuestion.filter((item) => {
                return item.id !== id
            })
            setListQuestion(cloneListQuestion)

        }
    }

    const handleAddDeleteAnswer = (type, indexQuestion, answerId) => {
        if (type === "ADD") {
            const newAnswer = {
                id: uuidv4(),
                description: "",
                isCorrect: false
            }
            listQuestion[indexQuestion].answers.push(newAnswer)
            setListQuestion([...listQuestion])
        } else if (type === "DELETE") {
            let cloneListQuestion = _.cloneDeep(listQuestion)
            const newArrAnswer = cloneListQuestion[indexQuestion].answers.filter((item) => item.id !== answerId)
            cloneListQuestion[indexQuestion].answers = newArrAnswer
            setListQuestion(cloneListQuestion)
        }
    }

    const handleOnChange = (type, questionId, answerId, value, indexQuestion) => {
        if (type === "QUESTION") {
            let cloneListQuestion = _.cloneDeep(listQuestion)
            const index = cloneListQuestion.findIndex((item) => { return item.id === questionId })
            if (index > -1) {
                cloneListQuestion[index].description = value
            }
            setListQuestion(cloneListQuestion)
        }
        if (type === "ANSWER") {
            let cloneListQuestion = _.cloneDeep(listQuestion)
            const index = cloneListQuestion[indexQuestion].answers.findIndex((item) => { return item.id === answerId })
            if (index > -1) {
                cloneListQuestion[indexQuestion].answers[index].description = value
                setListQuestion(cloneListQuestion)
            }
        }
        if (type === "CHECKBOX") {
            let cloneListQuestion = _.cloneDeep(listQuestion)
            const index = cloneListQuestion[indexQuestion].answers.findIndex((item) => { return item.id === answerId })
            if (index > -1) {
                cloneListQuestion[indexQuestion].answers[index].isCorrect = value
                setListQuestion(cloneListQuestion)
            }
        }
    }

    const handleOnChangeFile = (id, value) => {
        let cloneListQuestion = _.cloneDeep(listQuestion)
        const index = cloneListQuestion.findIndex((item) => item.id === id)
        cloneListQuestion[index].imageFile = value
        cloneListQuestion[index].imageName = value.name
        setListQuestion(cloneListQuestion)
    }

    const handleSetPreview = (imageFile, imageName) => {
        if (imageFile) {
            setPreviewImg(true)
            setDataPreviewImg({
                imageFile: URL.createObjectURL(imageFile),
                imageName
            })
        }
    }


    const handleSaveQuestions = async () => {
        // validate questions & answers
        if (selectedQuiz.value) {
            for (let i = 0; i < listQuestion.length; i++) {
                if (listQuestion[i].description) {
                    for (let j = 0; j < listQuestion[i].answers.length; j++) {
                        if (!listQuestion[i].answers[j].description) {
                            toast.error(`Emty description answer ${j + 1} of question ${i + 1}`)
                            return
                        }
                    }
                } else {
                    toast.error(`Emty description question ${i + 1}`)
                    break;
                }
            }
        } else {
            toast.error("Emty quiz choosen !!!")

        }

        // c1
        // await Promise.all(listQuestion.map(async (question) => {
        //     const q = await postQuestionforQuiz(selectedQuiz.value, question.description, question.image)

        //     await Promise.all(question.answers.map(async (answ) => {
        //         await postAnswersforQuestion(answ.description, answ.isCorrect, q.DT.id)
        //     }))
        // })) <-- cái này k chắc chắn sẽ chạy theo trình tự, Promise.all() chỉ sure chạy nhanh nhất

        // c2

        let cloneListQuestion = _.cloneDeep(listQuestion);
        for (let i = 0; i < cloneListQuestion.length; i++) {
            if (cloneListQuestion[i].imageFile) {
                cloneListQuestion[i].imageFile = await toBase64(cloneListQuestion[i].imageFile)
            }
        }

        let res = await postUpSertQAforQuiz({
            quizId: selectedQuiz.value,
            questions: cloneListQuestion
        })


        if (res && res.EC == 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }

        setListQuestion(initListuestions)

    }


    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });


    return (
        <div className="questions-container">
            <div className="title">{t('admin.manageQuiz.label2.header')}</div>
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label>{t('admin.manageQuiz.label2.input1')}</label>
                    <Select
                        defaultValue={selectedQuiz.label}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className="mt-3">
                    <div className="mb-1">
                        {t('admin.manageQuiz.label2.input2.title')}
                    </div>
                    {listQuestion && listQuestion.length > 0 && listQuestion.map((question, indexQuestion) => {
                        return (
                            <div key={question.id} className="q-main mb-5">
                                <div className="questions-content mb-3">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            value={question.description}
                                            onChange={(e) => handleOnChange("QUESTION", question.id, '', e.target.value)}
                                        />
                                        <label>{t('admin.manageQuiz.label2.input2.inputDescr')} {indexQuestion + 1}</label>
                                    </div>
                                    <div className="group-upload">
                                        <label className="lable-up" htmlFor={question.id} ><BiImageAdd className="uploadIcon" /></label>
                                        <input
                                            id={question.id}
                                            hidden
                                            type="file"
                                            onChange={(e) => handleOnChangeFile(question.id, e.target.files[0])}
                                        />
                                        <label onClick={() => handleSetPreview(question.imageFile, question.imageName)}> {question.imageName ? question.imageName : `${t('admin.manageQuiz.label2.input2.inputImg')}`}</label>


                                    </div>
                                    <div className="btn-group">
                                        <span >
                                            <BsFillPatchPlusFill
                                                className="icon-add"
                                                onClick={() => handleAddDeleteQuestion("ADD")}
                                            />
                                            {listQuestion.length > 1 &&
                                                <BsPatchMinusFill
                                                    className="icon-delete"
                                                    onClick={() => handleAddDeleteQuestion("DELETE", question.id)}
                                                />
                                            }


                                        </span>
                                    </div>
                                </div>
                                {question.answers && question.answers.length > 0 && question.answers.map((answ, answIndex) => {
                                    return (
                                        <div key={answ.id} className="answers-content mb-2">
                                            <input
                                                className="form-check-input isCorrect"
                                                type="checkbox"
                                                checked={answ.isCorrect}
                                                onChange={(e) => handleOnChange("CHECKBOX", question.id, answ.id, e.target.checked, indexQuestion)}
                                            />
                                            <div className="form-floating answers">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="name@example.com"
                                                    value={answ.description}
                                                    onChange={(e) => { handleOnChange("ANSWER", question.id, answ.id, e.target.value, indexQuestion) }}
                                                />
                                                <label>{t('admin.manageQuiz.label2.input2.inputAnswDescr')} {answIndex + 1}</label>
                                            </div>
                                            <div className="btn-group">
                                                <span >
                                                    <AiFillPlusSquare
                                                        className="icon-add"
                                                        onClick={() => handleAddDeleteAnswer("ADD", indexQuestion)}
                                                    />
                                                    {question.answers.length > 1 &&
                                                        <AiOutlineMinusCircle
                                                            className="icon-delete"
                                                            onClick={() => handleAddDeleteAnswer("DELETE", indexQuestion, answ.id)}
                                                        />
                                                    }

                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                    {listQuestion && listQuestion.length > 0 &&
                        <div>
                            <button onClick={() => handleSaveQuestions()} className="btn btn-warning">{t('admin.manageQuiz.label2.btnSave')}</button>

                        </div>
                    }
                    {previewImg &&
                        <Lightbox
                            image={dataPreviewImg.imageFile}
                            title={dataPreviewImg.imageName}
                            onClose={() => setPreviewImg(false)}
                        ></Lightbox>}
                </div>
            </div>
        </div>
    )
}

export default QAQuiz