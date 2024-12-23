import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

function Package(props) {
    // replace "\" with "/" to get the correct link & path
    //let bgString = props.item.background ? props.item.background.replace(/\\/g, "/") : "";

    let durationText = "";
    if (props.item.duration === 2629800000) {
        durationText = "1 Month";
    } else if (props.item.duration === 7889400000) {
        durationText = "3 Months";
    } else if (props.item.duration === 15778800000) {
        durationText = "6 Months";
    } else if (props.item.duration === 31556926000) {
        durationText = "1 Year";
    } else {
        durationText = "batata";
    }

    return (
        <div className="package-container">
            <img className="package-background" src={"http://localhost:3001/" + props.item.background} alt="Background" />
            <h4 className="package-name"><b>{props.item.name}</b></h4>
            <p className="price">Cost: {props.item.cost/100}$ </p>
            <div className="package-info">
                <p>Duration: {durationText} </p>
                <p>Description: {props.item.description} </p>
            </div>
            <div className="package-buttons">
                <button>
                    <FontAwesomeIcon className="fa-icon" icon={faPenToSquare}></FontAwesomeIcon>
                </button>
                <button onClick={() => props.function(props.item._id)}>
                    <FontAwesomeIcon className="fa-icon" icon={faTrash}></FontAwesomeIcon>
                </button>
            </div>
        </div>
    )
}

export default Package
