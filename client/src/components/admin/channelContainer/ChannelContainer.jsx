import "./channelContainer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAuthContext } from "../../../hooks/useAuthContext";


const ChannelContainer = ({ data, refresh, i }) => {
    const {user}=useAuthContext()

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/api/channels/delete/${id}` ,{headers:{authorization:`Bearer ${user.token}`}})
            .then(response => {
                console.log(response.data);
                refresh(i + 1); //update UI after deleting an item
                alert("Channel deleted");
            })
            .catch(error => {
                console.log(error);
                alert("There was an error deleting the channel. Please try again later.");
            });
    };

    return (
        <div className="all-channels-container">
            {data.map((item) => (
                <div key={item._id} className="channel-container">
                    <br />
                    <div className="channel-logo">
                        <img className="logo-css" src={"http://localhost:3001/" + item.logo} alt="Logo" />
                    </div>
                    <div className="channel-footer">
                        <div className="channel-name">
                            <span><b>{item.name}</b></span>
                        </div>
                        <div className="channel-buttons">

                            <button className="channel-button">
                                <FontAwesomeIcon className="fa-icon" icon={faPenToSquare}></FontAwesomeIcon>
                            </button>

                            <button onClick={() => handleDelete(item._id)}>
                                <FontAwesomeIcon className="fa-icon" icon={faTrash}></FontAwesomeIcon>
                            </button>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ChannelContainer;
