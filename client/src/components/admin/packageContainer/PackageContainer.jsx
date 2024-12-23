import "./packageContainer.css";
import Package from "./packageComponent";

const PackageContainer = ({ data, handleDelete }) => {
    
    return (
        <div className="all-packages-container">
            { data.map((item) => (
                <Package key={item._id} item={item} function={(e) => handleDelete(e)}/>
            ))}
        </div>
    )
}

export default PackageContainer;
