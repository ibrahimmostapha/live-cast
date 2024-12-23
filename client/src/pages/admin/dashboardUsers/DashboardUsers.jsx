import './dashboardUsers.css';
import UsersTable from '../../../components/admin/usersTable/UsersTable';
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from '../../../hooks/useAuthContext';

function DashboardUsers() {
    const { user } = useAuthContext()
    const [data, setData] = useState([]);
    // state to update UI after an event
    const [refresh, setRefresh] = useState(0);
    // set query to search for a user
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                const res = await axios.get("http://localhost:3001/api/user/all", { headers: { authorization: `Bearer ${user.token}` } });
                setData(res.data);
            };
            fetchData();
        }
    }, [refresh, user]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:3001/api/user/search?q=${query}`);
            setData(res.data);
        };
        if (query.length === 0 || query.length > 1) fetchData();
    }, [query]);

    // filer users data to get only regular users
    const filtered = data.filter(user => {
        return user.isAdmin == false;
    });

    return (
        <div>
            <div className="search-from-users-list">
                <div className="search-from-users-list-left-side">
                    <p className="table-title">List Of Users:</p>
                </div>
                <div className="search-from-users-list-left-side">
                    <input
                        type="search"
                        placeholder="Search.."
                        onChange={(e) => setQuery(e.target.value.toLowerCase())}
                    />
                </div>
            </div>
            <UsersTable refresh={(e) => { setRefresh(e) }} i={refresh} data={filtered} />
        </div>
    )
}

export default DashboardUsers;