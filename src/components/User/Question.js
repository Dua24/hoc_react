import { useEffect } from "react"
import _ from "lodash"
const Question = (props) => {
    const { dataQuiz, indexQuestion } = props
    if (_.isEmpty(dataQuiz)) {
        return (<></>)
    }
    const handleCheckBoxs = (e, answId, idQuestion) => {
        props.handleCheckBox(answId, idQuestion)
    }

    return (
        <>
            {dataQuiz.image ?
                <div className="q-image">
                    <img src={`data:image/png;base64, ${dataQuiz.image}`} alt="..." />
                </div>
                :
                <div className="q-image"></div>

            }
            < div className="question" > Question {indexQuestion + 1}: {dataQuiz.questionDesc} ?</div>
            <div className="answers">
                {dataQuiz.answer && dataQuiz.answer.length > 0 &&
                    dataQuiz.answer.map((answ, index) => {
                        return (
                            <div key={index} className="a-child">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox" value=""
                                        id="flexCheckChecked"
                                        onChange={(e) => handleCheckBoxs(e, answ.id, dataQuiz.questionId)}
                                        checked={answ.isChecked}
                                    />
                                    <label className="form-check-label" htmlFor="flexCheckChecked">
                                        {index + 1}. {answ.description}
                                    </label>
                                </div>
                            </div>
                        )
                    }

                    )}
            </div>


        </>
    )
}

export default Question