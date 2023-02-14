import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getQuestionByQuizId, postSubmitQuiz } from '../../services/apiServices';
import _ from 'lodash';
import "./DetailQuiz.scss"
import Question from './Question';
import ModalResult from './ModalResult';
import RightContent from './Content/RightContent';


const DetailQuiz = (props) => {
    const { quizId } = useParams()
    const location = useLocation()
    const [dataQuiz, setDataQuiz] = useState([])
    const [indexQuestion, setIndexQuestion] = useState(0)
    const [isShowModalResult, setIsShowModalResult] = useState(false)
    const [dataModalResult, setDataModalResult] = useState({})
    const [answerChecked, setAnswerChecked] = useState(false)

    useEffect(() => {
        fetchQuestionByQuizId()
    }, [])
    const handleNext = () => {
        if (dataQuiz.length > indexQuestion + 1)
            setIndexQuestion(indexQuestion + 1)
    }
    const handlePrev = () => {
        if (indexQuestion !== 0) {
            setIndexQuestion(indexQuestion - 1)
        }
    }

    const handleCheckBox = (answId, idQuestion) => {
        const dataQuizClone = _.cloneDeep(dataQuiz)
        dataQuizClone.filter((question, index) => {
            if (question.questionId === idQuestion) {
                question.answer.find((a) => {
                    if (a.id === answId) {
                        a.isChecked = !a.isChecked
                    }
                })
            }
        })
        setDataQuiz(dataQuizClone)
    }

    const handleSubmitAnswer = async () => {
        const dataSubmit = {
            quizId,
            answers: []
        }
        dataQuiz.map((question) => {
            if (question && question.answer) {
                const userAnswerId = []
                question.answer.find((a) => {
                    if (a.isChecked === true) {
                        userAnswerId.push(a.id)
                    }
                })
                dataSubmit.answers.push({
                    "questionId": +question.questionId,
                    "userAnswerId": userAnswerId
                })
            }
        })
        const res = await postSubmitQuiz(dataSubmit)
        if (res && res.EC == 0) {
            setDataModalResult(res.DT)
            setIsShowModalResult(true)
        } else {
            alert("Sthing wrong???")
        }

    }


    const fetchQuestionByQuizId = async () => {
        const res = await getQuestionByQuizId(quizId)
        if (res.EC === 0) {
            const raw = res.DT
            const data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    const answer = []
                    let questionDesc = null;
                    let image = null
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDesc = item.description
                            image = item.image
                        }
                        answer.push(item.answers)
                        item.answers.isChecked = false
                    })
                    return {
                        questionId: key,
                        answer,
                        questionDesc,
                        image,
                    }
                })
                .value()
            setDataQuiz(data);
        }

    }
    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">Quiz {quizId}: {location.state.quizTitle}</div>
                <div className="q-body">
                    <img alt="" />
                </div>
                <div className="q-content">
                    <Question
                        dataQuiz={dataQuiz && dataQuiz.length > 0 ? dataQuiz[indexQuestion] : []}
                        indexQuestion={indexQuestion}
                        handleCheckBox={handleCheckBox}

                    />
                </div>
                <div className="footer">
                    <button onClick={() => handlePrev()} className="btn btn-secondary">Prev</button>
                    <button onClick={() => handleNext()} className="btn btn-primary">Next</button>
                    <button onClick={() => handleSubmitAnswer()} className="btn btn-warning">Finish</button>
                </div>
            </div>
            <div className="right-content">
                <RightContent
                    dataQuiz={dataQuiz}
                    handleSubmitAnswer={handleSubmitAnswer}
                    setIndexQuestion={setIndexQuestion}
                />
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}

            />
        </div>
    )
}


export default DetailQuiz