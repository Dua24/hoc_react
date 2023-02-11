
const QuizTable = (props) => {
    const { listAllQuiz } = props
    return (
        <table className="table table-hover table-bordered ">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Type</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {listAllQuiz.map((item, index) => {
                    return (
                        <tr key={index} >
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.difficulty}</td>
                            <td>
                                <button onClick={() => props.handleClickBtnUpdateQuiz(item)} className="btn btn-warning mx-3">Update</button>
                                <button onClick={() => props.handleClickBtnDeleteQuiz(item.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    )
                })}


            </tbody>
        </table>
    )
}

export default QuizTable