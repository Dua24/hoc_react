import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getQuestionByQuizId } from '../../services/apiServices';
import _ from 'lodash';
import "./DetailQuiz.scss"
import Question from './Question';

const DetailQuiz = (props) => {
    const { quizId } = useParams()
    const location = useLocation()
    const [dataQuiz, setDataQuiz] = useState([])
    const [indexQuestion, setIndexQuestion] = useState(0)
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

    const fetchQuestionByQuizId = async () => {
        const res = await getQuestionByQuizId(quizId)
        if (res.EC == 0) {
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
                    })
                    return {
                        questionId: key,
                        answer,
                        questionDesc,
                        image
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
                    <img />
                </div>
                <div className="q-content">
                    <Question
                        dataQuiz={dataQuiz && dataQuiz.length > 0 ? dataQuiz[indexQuestion] : []}
                        indexQuestion={indexQuestion}
                    />
                </div>
                <div className="footer">
                    <button onClick={() => handlePrev()} className="btn btn-secondary">Prev</button>
                    <button onClick={() => handleNext()} className="btn btn-primary">Next</button>
                    <button onClick={() => handleNext()} className="btn btn-warning">Finish</button>
                </div>
            </div>
            <div className="right-content">Clock count down</div>
        </div>
    )
}


export default DetailQuiz