import "./dashboardChannels.css";
import AddNewChannel from '../../../components/admin/addNewChannel/AddNewChannel';
import ChannelContainer from '../../../components/admin/channelContainer/ChannelContainer';
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";


function DashboardChannels() {
    const { user } = useAuthContext()
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0); // state to update UI after an event

    const [query, setQuery] = useState(""); // set query to search for a channel

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                const res = await axios.get("http://localhost:3001/api/channels/all", { headers: { authorization: `Bearer ${user.token}` } });
                setData(res.data);
            };
            fetchData();
        }
    }, [refresh, user]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:3001/api/channels/search?q=${query}`);
            setData(res.data);
        };
        if (query.length === 0 || query.length > 1) fetchData();
    }, [query]);

    return (
        <div className='flex flex-col w-full h-full'>
            <AddNewChannel />
            <div className="channel-search">
                <input
                    type="search"
                    placeholder="Search.."
                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                />
            </div>
            <ChannelContainer refresh={(e) => { setRefresh(e) }} i={refresh} data={data} />
        </div>
    )
}

export default DashboardChannels;
