import { useState, useEffect } from 'react';
import {
    BarChart, CartesianGrid, XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    ResponsiveContainer
} from 'recharts';
import _ from "lodash"
import { getDashBoardOverview } from '../../services/apiServices';
import { useTranslation, Trans } from 'react-i18next';

const Dashboard = (props) => {
    const { t } = useTranslation();

    const [dataDashBoard, setDataDashBoard] = useState({
        users: {
            total: 0,
            countUsers: 0,
            countAdmin: 0
        },
        others: {
            countQuiz: 0,
            countQuestions: 0,
            countAnswers: 0
        }
    })

    const [dataChart, setDataChart] = useState([])


    useEffect(() => {
        fetchDataDashBoard()
    }, [])

    const fetchDataDashBoard = async () => {
        const res = await getDashBoardOverview();
        if (res && res.EC === 0) {
            setDataDashBoard(res.DT)

            let Qz = 0, Qs = 0, As = 0
            Qz = res?.DT?.others?.countQuiz
            Qs = res?.DT?.others?.countQuestions
            As = res?.DT?.others?.countAnswers
            const data = [
                {
                    name: "Quizzes",
                    Qz
                },
                {
                    name: "Questions",
                    Qs
                },
                {
                    name: "Answer",
                    As
                }
            ]
            setDataChart(data)
        }
    }
    return (
        < div className="dashboard-container" >
            <div className="dashboard-title">{t('admin.dashboard.title')}</div>
            <div className="dashboard-content">
                <div className="l-board">
                    <div className="child">
                        <span className="text-1">{t('admin.dashboard.content.overview1')}</span>
                        <span className="text-2">{dataDashBoard.users.countUsers}</span>
                    </div>
                    <div className="child">
                        <span className="text-1">{t('admin.dashboard.content.overview2')}</span>
                        <span className="text-2">{dataDashBoard.others.countQuiz}</span>
                    </div>
                    <div className="child">
                        <span className="text-1">{t('admin.dashboard.content.overview3')}</span>
                        <span className="text-2">{dataDashBoard.others.countQuestions}</span>
                    </div>
                    <div className="child">
                        <span className="text-1">{t('admin.dashboard.content.overview4')}</span>
                        <span className="text-2">{dataDashBoard.others.countAnswers}</span>
                    </div>
                </div>
                <div className="r-board ">
                    <ResponsiveContainer width="90%" height="100%"  >
                        <BarChart data={dataChart} >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            {/* <YAxis /> */}
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#9c27b0" />
                            <Bar dataKey="Qs" fill="#4caf50" />
                            <Bar dataKey="As" fill="#795548" />
                        </BarChart>
                    </ResponsiveContainer>

                </div>
            </div>
        </div>
    )
}

export default Dashboard