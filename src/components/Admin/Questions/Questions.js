import { useState } from 'react';
import Select from 'react-select';
import "./Questions.scss"
import { BsFillPatchPlusFill, BsPatchMinusFill } from "react-icons/bs"
import { AiFillPlusSquare, AiOutlineMinusCircle } from 'react-icons/ai';
import { BiImageAdd } from "react-icons/bi"
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash"
import Lightbox from "react-awesome-lightbox";
const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({})

    const [listQuestion, setListQuestion] = useState([
        {
            id: uuidv4(),
            description: "",
            image: "",
            imageName: "",
            answers: [
                {
                    id: uuidv4(),
                    description: "Description answer",
                    isCorrect: false
                }
            ]
        }
    ])

    const [previewImg, setPreviewImg] = useState(false)

    const handleAddDeleteQuestion = (type, id) => {
        if (type === "ADD") {
            const newQuestion = {
                id: uuidv4(),
                description: "Description question",
                image: "",
                answers: [
                    {
                        id: uuidv4(),
                        description: "Description answer",
                        isCorrect: ""
                    }
                ]
            }
            setListQuestion([...listQuestion, newQuestion])
        } else if (type === "DELETE") {
            console.log("check", id)
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
                description: "Description answer",
                isCorrect: ""
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
        console.log(index)
        console.log(value)
        cloneListQuestion[index].image = value
        cloneListQuestion[index].imageName = value.name
        setListQuestion(cloneListQuestion)
    }


    for (let i = 0; i < listQuestion.length; i++) {
        console.log(listQuestion[i].id)
    }

    const handleSaveQuestions = () => {
        console.log(listQuestion)
    }

    const handleSetPreview = (image) => {
        if (image) {
            setPreviewImg(true)
        }
    }

    return (
        <div className="questions-container">
            <div className="title">Manage Question</div>
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label>Select Quiz</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>
                <div className="mt-3">
                    <div className="mb-1">
                        Add question:
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
                                        <label>Description {indexQuestion + 1}</label>
                                    </div>
                                    <div className="group-upload">
                                        <label className="lable-up" htmlFor={question.id} ><BiImageAdd className="uploadIcon" /></label>
                                        <input
                                            id={question.id}
                                            hidden
                                            type="file"
                                            onChange={(e) => handleOnChangeFile(question.id, e.target.files[0])}
                                        />
                                        {console.log(indexQuestion)}
                                        <label onClick={() => handleSetPreview(question.image)}> {question.imageName ? question.imageName : '0 file choosen'}</label>
                                        {previewImg &&
                                            <Lightbox
                                                image={URL.createObjectURL(question.image)}
                                                title={question.imageName}
                                                onClose={() => setPreviewImg(false)}

                                            ></Lightbox>}

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
                                                <label>Answer description: {answIndex + 1}</label>
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
                            <button onClick={() => handleSaveQuestions()} className="btn btn-warning">Save Questions</button>

                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Questions