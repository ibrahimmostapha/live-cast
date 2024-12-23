import "./addNewAdmin.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';


function AddNewAdmin() {

    return (
        <div className="add-new-admin-container">
            <p className="add-admin-title">Add New Admin:</p>
            <div className="add-new-admin-inputs-n-button">
                <div className="add-new-admin-inputs">
                    <div className="add-new-admin-inputs-left-side" >
                        <div className="input_text">
                            <input type="text" placeholder="Username" />
                            <FontAwesomeIcon className="fa" icon={faUser}></FontAwesomeIcon>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div className="input_text" style={{ marginRight: "5px" }}>
                                <input type="text" placeholder="First Name" />
                            </div>
                            <div className="input_text" 
                            // style={{ marginLeft: "5px" }}
                            >
                                <input type="text" placeholder="Last Name" />
                            </div>
                        </div>
                    </div>
                    <div className="add-new-admin-inputs-right-side">
                        <div className="input_text">
                            <input type="email" placeholder="Email" />
                            <FontAwesomeIcon className="fa" icon={faEnvelope}></FontAwesomeIcon>
                        </div>
                        <div className="input_text">
                            <input type="password" className="signup_pass" id="passInput" placeholder="Password" />
                            <FontAwesomeIcon className="fa" icon={faLock}></FontAwesomeIcon>
                        </div>
                    </div>
                </div>
                <div className="add-admin-btn">
                    <button id="add-admin-button">Add</button>
                </div>
            </div>
        </div>
    )
}

export default AddNewAdmin;
