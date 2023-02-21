import { useState, useEffect, useRef } from "react"
import "../DetailQuiz.scss"
import CountDown from "./CountDown"

const RightContent = (props) => {
    const { dataQuiz, handleSubmitAnswer } = props
    const refDiv = useRef([])
    const handleTimeOut = () => {
        handleSubmitAnswer()
    }


    const handleCheckAnswer = (item, index) => {
        if (item && item.answer.length > 0) {
            let isAnswered = item.answer.find(a => a.isChecked === true)
            if (isAnswered) {
                return "question selected"
            }
            return "question"
        }
    }

    const handleClickAnswer = (question, indexQuestion) => {
        props.setIndexQuestion(indexQuestion)
        for (let i = 0; i < refDiv.current.length; i++) {
            if (refDiv.current[i].className == "question clicked") {
                refDiv.current[i].className = "question"
            }
        }
        if (refDiv.current[indexQuestion].className.includes("selected")) {
            refDiv.current[indexQuestion].className = "question selected clicked"
        } else {
            refDiv.current[indexQuestion].className = "question clicked"

        }
    }




    return (
        <>
            <div className="main-timer">
                <CountDown
                    s={6000}
                    handleTimeOut={handleTimeOut}
                    PressBtnShowAnswer={props.PressBtnShowAnswer}
                />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 && dataQuiz.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={handleCheckAnswer(item, index)}
                            onClick={() => handleClickAnswer(item, index)}
                            ref={ref => refDiv.current[index] = ref}
                        >
                            {index + 1}
                        </div>
                    )
                })}
            </div>
        </>
    )
}


export default RightContent