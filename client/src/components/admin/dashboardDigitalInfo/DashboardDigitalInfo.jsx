import "./dashboardDigitalInfo.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBox, faUserCheck, faTv, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";


function DashboardDigitalInfo() {
    const { user } = useAuthContext()
    const [users, setUsers] = useState([]);
    const [packages, setPackages] = useState([]);
    const [channels, setChannels] = useState([]);
    const [income, setIncome] = useState(0);

    useEffect(() => {
        if (user) {

            // fetch data from backend & set it in arry
            const fetchData = async () => {
                const allUsers = await axios.get("http://localhost:3001/api/user/all", { headers: { authorization: `Bearer ${user.token}` } });
                const packages = await axios.get("http://localhost:3001/api/packages/forAdmin", { headers: { authorization: `Bearer ${user.token}` } });
                const channels = await axios.get("http://localhost:3001/api/channels/all", { headers: { authorization: `Bearer ${user.token}` } });
                const result = await axios.get("http://localhost:3001/api/subscribe/income", { headers: { authorization: `Bearer ${user.token}` } });

                setUsers(allUsers.data);
                setPackages(packages.data);
                setChannels(channels.data);
                setIncome(result.data.totalIncome)
            };
            fetchData();
        }
    }, [user]);

    // filer users data to get only subscribed
    const subscribed = users.filter(user => {
        return user.plan != null;
    });

    return (
        <div className="digital-info-container w-full">
            <div className="digital-info-left-side">
                <div className="digital-info-left-side-left-side">
                    <div className="digital-info-side">
                        <div className="card-top">
                            <div className="card-name">
                                Users
                            </div>
                            <div className="card-icon">
                                <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
                            </div>
                        </div>
                        <div className="card-value">
                            {users.length}
                        </div>
                    </div>
                    <div className="digital-info-side">
                        <div className="card-top">
                            <div className="card-name">
                                Packages
                            </div>
                            <div className="card-icon">
                                <FontAwesomeIcon icon={faBox}></FontAwesomeIcon>
                            </div>
                        </div>
                        <div className="card-value">
                            {packages.length}
                        </div>
                    </div>
                </div>
                <div className="digital-info-left-side-right-side">
                    <div className="digital-info-side">
                        <div className="card-top">
                            <div className="card-name">
                                Subscribers
                            </div>
                            <div className="card-icon">
                                <FontAwesomeIcon icon={faUserCheck}></FontAwesomeIcon>
                            </div>
                        </div>
                        <div className="card-value">
                            {subscribed.length}
                        </div>
                    </div>
                    <div className="digital-info-side">
                        <div className="card-top">
                            <div className="card-name">
                                Channels
                            </div>
                            <div className="card-icon">
                                <FontAwesomeIcon icon={faTv}></FontAwesomeIcon>
                            </div>
                        </div>
                        <div className="card-value">
                            {channels.length}
                        </div>
                    </div>
                </div>
            </div>
            <div className="digital-info-right-side">
                <div className="total-income h-full flex flex-col justify-between">
                    <div className="card-top">
                        <div className="card-name">
                            Total incomes
                        </div>
                        <div className="card-icon">
                            <FontAwesomeIcon icon={faSackDollar}></FontAwesomeIcon>
                        </div>
                    </div>
                    <div className="card-value">
                        {income+" $"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardDigitalInfo;
