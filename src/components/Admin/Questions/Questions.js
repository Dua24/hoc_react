import { useEffect, useState } from 'react';
import Select from 'react-select';
import "./Questions.scss"
import { BsFillPatchPlusFill, BsPatchMinusFill } from "react-icons/bs"
import { AiFillPlusSquare, AiOutlineMinusCircle } from 'react-icons/ai';
import { BiImageAdd } from "react-icons/bi"
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash"
import Lightbox from "react-awesome-lightbox";
import { getAllQuiz, postAnswersforQuestion, postQuestionforQuiz } from "../../../services/apiServices";
import { toast } from 'react-toastify';
import { useTranslation, Trans } from 'react-i18next';

const Questions = (props) => {
    const initListuestions = [
        {
            id: uuidv4(),
            description: "",
            image: "",
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
                image: "",
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
        cloneListQuestion[index].image = value
        cloneListQuestion[index].imageName = value.name
        setListQuestion(cloneListQuestion)
    }

    const handleSetPreview = (image, imageName) => {
        if (image) {
            setPreviewImg(true)
            setDataPreviewImg({
                image: URL.createObjectURL(image),
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

        // Nếu cần dùng loop + callApi -> use for(leti=0;i<length,i++) loop

        // c1
        // await Promise.all(listQuestion.map(async (question) => {
        //     const q = await postQuestionforQuiz(selectedQuiz.value, question.description, question.image)

        //     await Promise.all(question.answers.map(async (answ) => {
        //         await postAnswersforQuestion(answ.description, answ.isCorrect, q.DT.id)
        //     }))
        // })) <-- cái này k chắc chắn sẽ chạy theo trình tự, Promise.all() chỉ sure chạy nhanh nhất

        // c2
        for (const question of listQuestion) {
            const q = await postQuestionforQuiz(selectedQuiz.value, question.description, question.image)
            for (const answer of question.answers) {
                await postAnswersforQuestion(answer.description, answer.isCorrect, q.DT.id)
            }
        }

        setListQuestion(initListuestions)
    }



    return (
        <div className="questions-container">
            <div className="title">{t('admin.manageQuestion.header')}</div>
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label>{t('admin.manageQuestion.input1')}</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className="mt-3">
                    <div className="mb-1">
                        {t('admin.manageQuestion.input2')}
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
                                        <label>{t('admin.manageQuestion.input3')} {indexQuestion + 1}</label>
                                    </div>
                                    <div className="group-upload">
                                        <label className="lable-up" htmlFor={question.id} ><BiImageAdd className="uploadIcon" /></label>
                                        <input
                                            id={question.id}
                                            hidden
                                            type="file"
                                            onChange={(e) => handleOnChangeFile(question.id, e.target.files[0])}
                                        />
                                        <label onClick={() => handleSetPreview(question.image, question.imageName)}> {question.imageName ? question.imageName : `${t('admin.manageQuestion.input4')}`}</label>


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
                                                value={answ.isCorrect}
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
                                                <label>{t('admin.manageQuestion.input5')}: {answIndex + 1}</label>
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
                            <button onClick={() => handleSaveQuestions()} className="btn btn-warning">{t('admin.manageQuestion.btnSave')}</button>

                        </div>
                    }
                    {previewImg &&
                        <Lightbox
                            image={dataPreviewImg.image}
                            title={dataPreviewImg.imageName}
                            onClose={() => setPreviewImg(false)}
                        ></Lightbox>}
                </div>
            </div>
        </div>
    )
}

export default Questions