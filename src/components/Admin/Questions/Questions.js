import { useState } from 'react';
import Select from 'react-select';
import "./Questions.scss"
import { BsFillPatchPlusFill, BsPatchMinusFill } from "react-icons/bs"
import { AiFillPlusSquare, AiOutlineMinusCircle } from 'react-icons/ai';
import { BiImageAdd } from "react-icons/bi"
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash"
const Questions = (props) => {
    console.log("render")
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({})

    const [listQuestion, setListQuestion] = useState([
        {
            id: uuidv4(),
            description: "Description question",
            image: "",
            answers: [
                {
                    id: uuidv4(),
                    description: "Description answer 1",
                    isCorrect: ""
                },
                {
                    id: uuidv4(),
                    description: "Description answer 2",
                    isCorrect: ""
                }
            ]
        },
        {
            id: uuidv4(),
            description: "Description question",
            image: "",
            answers: [
                {
                    id: uuidv4(),
                    description: "Description answer 1",
                    isCorrect: ""
                },
                {
                    id: uuidv4(),
                    description: "Description answer 2",
                    isCorrect: ""
                }
            ]
        }

    ])

    const handleAddDeleteQuestion = (type, id) => {
        if (type === "ADD") {
            const newQuestion = {
                id: uuidv4(),
                description: "Description question",
                image: "",
                answers: [
                    {
                        id: uuidv4(),
                        description: "Description answer 1",
                        isCorrect: ""
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


    const handleAddDeleteAnswer = (type, questionId, indexQuestion, answerId) => {
        if (type === "ADD") {
            const newAnswer = {
                id: uuidv4(),
                description: "Description answer 1",
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
                    {listQuestion && listQuestion.length > 0 && listQuestion.map((question, index) => {
                        return (
                            <div key={question.id} className="q-main mb-5">
                                <div className="questions-content mb-3">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" placeholder="name@example.com" />
                                        <label>{question.description} : {index + 1}</label>
                                    </div>
                                    <div className="group-upload">
                                        <label className="lable-up" htmlFor="imgUpload" ><BiImageAdd className="uploadIcon" /> Upload File Image</label>
                                        <input
                                            id="imgUpload"
                                            hidden
                                            type="file"
                                        />
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
                                    { console.log(question.answers.length) }
                                    return (
                                        <div key={answ.id} className="answers-content mb-2">
                                            <input
                                                className="form-check-input isCorrect"
                                                type="checkbox"
                                            />
                                            <div className="form-floating answers">
                                                <input type="text" className="form-control" placeholder="name@example.com" />
                                                <label>{answ.description}: {answIndex + 1}</label>
                                            </div>
                                            <div className="btn-group">
                                                <span >
                                                    <AiFillPlusSquare
                                                        className="icon-add"
                                                        onClick={() => handleAddDeleteAnswer("ADD", question.id, index)}
                                                    />
                                                    {question.answers.length > 1 &&
                                                        <AiOutlineMinusCircle
                                                            className="icon-delete"
                                                            onClick={() => handleAddDeleteAnswer("DELETE", question.id, index, answ.id)}
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
                </div>
            </div>
        </div>
    )
}

export default Questions