import "./editProfile.css";

import NavBar from "../../components/main/navBar";
// import NavBar from "../../components/main/navBar";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

function EditProfile() {

    return (
        <div>
            {/* <div> 
                <NavBar />
            </div> */}
            <div className="edit-profile-body-container">
                <div className="card-edit-profile">
                    <div className="card-left-side">
                        <div className="edit-profile">
                            <h2>Hello, user!</h2><br />
                        </div>
                        <div>
                            <h3>Edit Profile</h3>
                        </div>
                        <form className="edit-profile-form" method="post">
                            {/* <div className="input_text">
                                <input type="text" placeholder="Username" />
                                <FontAwesomeIcon className="fa" icon={faUser}></FontAwesomeIcon>
                            </div> */}
                            <div style={{ display: "flex" }}>
                                <div className="input_text" style={{ marginRight: "5px" }}>
                                    <input type="text" placeholder="First Name" />
                                </div>
                                <div className="input_text">
                                    <input type="text" placeholder="Last Name" />
                                </div>
                            </div>
                            <div className="input_text">
                                <input type="email" placeholder="Email" />
                                <FontAwesomeIcon className="fa" icon={faEnvelope}></FontAwesomeIcon>
                            </div>
                            <div className="input_text">
                                <input type="password" className="signup_pass" id="passInput" placeholder="Password" />
                                <FontAwesomeIcon className="fa" icon={faLock}></FontAwesomeIcon>
                            </div>
                            <div style={{ display: "flex" }}>
                                <div className="edit_btn" style={{ marginRight: "5px" }}>
                                    <button id="edit_profile_button">Edit</button>
                                </div>
                                <div className="done_edit_btn">
                                    <button id="edit_done_button">Done</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="card-right-side">
                        <p>Delete your</p>
                        <p>account permanently</p>
                        <div className="delete-btn">
                            <button className="dlt-btn" id="delete_button">Delete</button>
                        </div>
                    </div>
                </div>
                <div className="subscribe-box">
                    <h1>Not Subscribed?!!</h1>
                    <a href="/subscribe" className="subscribe">Go Subscribe Now!</a>
                    <p>Subscribe To Unlock All Channels</p>
                    <p>Enjoy :p</p>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;
