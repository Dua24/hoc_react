import { useEffect, useState } from "react"
import _ from "lodash"
import Lightbox from "react-awesome-lightbox";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai"
const Question = (props) => {
    const { dataQuiz, indexQuestion, arrCorrectAnswer } = props

    const [previewImg, setPreviewImg] = useState(false)
    if (_.isEmpty(dataQuiz)) {
        return (<></>)
    }
    const handleCheckBoxs = (e, answId, idQuestion) => {
        props.handleCheckBox(answId, idQuestion)
    }
    return (
        <>
            {dataQuiz.image ?
                <div onClick={() => setPreviewImg(true)} className="q-image">
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
                                    {props.PressBtnShowAnswer && !_.isEmpty(arrCorrectAnswer) &&
                                        <span style={{ marginLeft: "8px" }}>
                                            {arrCorrectAnswer.includes(answ.id) ?
                                                <span style={{ color: 'green' }}><AiOutlineCheck /></span>
                                                :
                                                <span style={{ color: "red" }}><AiOutlineClose /></span>
                                            }
                                        </span>
                                    }
                                </div>
                            </div>
                        )
                    }

                    )}
            </div>
            {previewImg &&
                <Lightbox
                    image={`data:image/png;base64, ${dataQuiz.image}`}
                    title={"Question image"}
                    onClose={() => setPreviewImg(false)}
                ></Lightbox>}

        </>
    )
}

export default Question