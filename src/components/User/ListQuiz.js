import { useState, useEffect } from "react"
import { getQuizByUser } from "../../services/apiServices"
import "./ListQuiz.scss"
import { useNavigate } from "react-router-dom"
const ListQuiz = (props) => {
    const nagivate = useNavigate()
    const [arrQuiz, setArrQuiz] = useState([])
    useEffect(() => {
        fetchListQuiz()
    }, [])



    const fetchListQuiz = async () => {
        const res = await getQuizByUser()
        if (res.EC == 0) {
            setArrQuiz(res.DT)
        }
    }
    return (
        <div className="list-quiz-container container">
            <div className="row">
                {arrQuiz && arrQuiz.length > 0 && arrQuiz.map((item, index) => {
                    return (
                        <div key={index} className="col-3 mb-4">
                            <div className="card" >
                                <img src={`data:image/png;base64, ${item.image}`} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Quiz {item.id}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <a onClick={() => nagivate(`/quiz/${item.id}`, { state: { quizTitle: item.description, } })} className="btn btn-primary">Start now</a>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {arrQuiz && arrQuiz.length == 0 &&
                    <div>You have no quiz</div>
                }
            </div>
        </div>



    )
}

export default ListQuiz