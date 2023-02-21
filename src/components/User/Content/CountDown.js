import { useEffect, useState } from "react"

const CountDown = (props) => {
    const { s, handleTimeOut } = props
    const [timeLeft, setTimeLeft] = useState(s)

    useEffect(() => {
        if (!timeLeft) {
            handleTimeOut()
            return;
        }
        const IdInterval = setInterval(() => {
            setTimeLeft(timeLeft - 1)
        }, 1000)

        return () => clearInterval(IdInterval)

    }, [timeLeft])

    String.prototype.toHHMMSS = function () {
        var sec_num = parseInt(this, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds;
    }
    return (
        props.PressBtnShowAnswer ? <span style={{ color: "red", fontWeight: "bold" }}>FINISHED</span> :
            <div>{timeLeft.toString().toHHMMSS()}</div>
    )
}

export default CountDown