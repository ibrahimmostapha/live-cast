import "./dashboardBroadcast.css";
import AddNewBroadcast from '../../../components/admin/addNewBroadcast/AddNewBroadcast';
import BroadcastContainer from "../../../components/admin/broadcastContainer/BroadcastContainer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";


function DashboardBroadcast() {
    const { user } = useAuthContext()
    const [data, setData] = useState([]);
    const [broadcast, setBroadcast] = useState([]);

    const [query, setQuery] = useState(""); // set query to search for a broadcast

    async function fetchBroadcasts() {
        const res = await axios.get("http://localhost:3001/api/broadcasts/all", { headers: { authorization: `Bearer ${user.token}` } });
        setBroadcast(res.data);
    };

    const fetchChannels = async () => {
        const res = await axios.get("http://localhost:3001/api/channels/all", { headers: { authorization: `Bearer ${user.token}` } });
        setData(res.data);
    };

    useEffect(() => {
        if (user) {
            fetchChannels();
            fetchBroadcasts();
        }
    }, [user]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:3001/api/broadcasts/searchBroadcast?q=${query}`);
            setBroadcast(res.data);
        };
        if (query.length === 0 || query.length > 1) fetchData();
    }, [query]);
    
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/api/broadcasts/delete/${id}`, { headers: { authorization: `Bearer ${user.token}` } })
            .then(response => {
                fetchBroadcasts()
                alert("Broadcast deleted");
            })
            .catch(error => {
                console.log(error);
                alert("There was an error deleting the broadcast. Please try again later.");
            });
    };

    return (
        <div>
            <AddNewBroadcast data={data} />
            <div className="broadcast-search">
                <input
                    type="search"
                    placeholder="Search.."
                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                />
            </div>
            <div className="all-broadcasts">
                <BroadcastContainer broadcast={broadcast} func={(id)=>handleDelete(id)}/>
            </div>
        </div>
    )
}

export default DashboardBroadcast;
