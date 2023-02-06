import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionByQuizId } from '../../services/apiServices';



const DetailQuiz = (props) => {
    const { quizId } = useParams()
    useEffect(() => {
        fetchQuestionByQuizId()
    }, [])


    const fetchQuestionByQuizId = async () => {
        console.log(quizId)
        const res = await getQuestionByQuizId(quizId)
        console.log(res)

    }

    return (
        <div>Detail Quiz</div>
    )
}


export default DetailQuiz