import "./dashboardPackages.css";
import AddNewPackage from '../../../components/admin/addNewPackage/AddNewPackage';
import PackageContainer from '../../../components/admin/packageContainer/PackageContainer';
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";

function DashboardPackages() {
    const {user}=useAuthContext()
    const [data, setData] = useState([]);

    const [query, setQuery] = useState(""); // set query to search for a package

    async function fetchData(){
        const res = await axios.get("http://localhost:3001/api/packages/forAdmin",{headers:{authorization:`Bearer ${user.token}`}});
        setData(res.data);
    };

    useEffect(() => {
        if(user){
            fetchData();
        }
    }, [user]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/api/packages/delete/${id}`,{headers:{authorization:`Bearer ${user.token}`}})
            .then(response => {
                fetchData(); // Refetch data after deleting an item
                alert("Package deleted");
            })
            .catch(error => {
                console.log(error);
                alert("There was an error deleting the package. Please try again later.");
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:3001/api/packages/search?q=${query}`);
            setData(res.data);
        };
        if (query.length === 0 || query.length > 1) fetchData();
    }, [query]);

    return (
        <div>
            <AddNewPackage />
            <div className="package-search">
                <input
                    type="search"
                    placeholder="Search.."
                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                />
            </div>
            <PackageContainer data={data} handleDelete={(id)=>handleDelete(id)} />
        </div>
    )
}

export default DashboardPackages;
