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

    console.log(arrQuiz)


    const fetchListQuiz = async () => {
        const res = await getQuizByUser()
        if (res.EC == 0) {
            setArrQuiz(res.DT)
        }
    }
    return (
        <div className="list-quiz-container container">
            {arrQuiz && arrQuiz.length > 0 && arrQuiz.map((item, index) => {
                return (
                    <div className="card" style={{ width: "18rem" }} key={index}>
                        <img src={`data:image/png;base64, ${item.image}`} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Quiz {item.id}</h5>
                            <p className="card-text">{item.description}</p>
                            <a onClick={() => nagivate(`/quiz/${item.id}`, { state: { quizTitle: item.description, } })} className="btn btn-primary">Start now</a>
                        </div>
                    </div>
                )
            })}
            {arrQuiz && arrQuiz.length == 0 &&
                <div>You have no quiz</div>
            }
        </div>



    )
}

export default ListQuiz