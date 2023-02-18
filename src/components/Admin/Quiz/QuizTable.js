import { useTranslation, Trans } from 'react-i18next';

const QuizTable = (props) => {
    const { listAllQuiz } = props
    const { t } = useTranslation();

    return (
        <table className="table table-hover table-bordered ">
            <thead>
                <tr>
                    <th scope="col">{t('admin.manageQuiz.label1.tableQuiz.thead.col1')}</th>
                    <th scope="col">{t('admin.manageQuiz.label1.tableQuiz.thead.col2')}</th>
                    <th scope="col">{t('admin.manageQuiz.label1.tableQuiz.thead.col3')}</th>
                    <th scope="col">{t('admin.manageQuiz.label1.tableQuiz.thead.col4')}</th>
                    <th scope="col">{t('admin.manageQuiz.label1.tableQuiz.thead.col5')}</th>
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
                                <button onClick={() => props.handleClickBtnUpdateQuiz(item)} className="btn btn-warning mx-3">{t('admin.manageQuiz.label1.tableQuiz.tbody.btnUpdate')}</button>
                                <button onClick={() => props.handleClickBtnDeleteQuiz(item.id)} className="btn btn-danger">{t('admin.manageQuiz.label1.tableQuiz.tbody.btnDelete')}</button>
                            </td>
                        </tr>
                    )
                })}


            </tbody>
        </table>
    )
}

export default QuizTable