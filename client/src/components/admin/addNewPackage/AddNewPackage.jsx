import "./addNewPackage.css";
import { useState } from 'react';
import { useAuthContext } from "../../../hooks/useAuthContext";


function AddNewPackage() {
    const {user}=useAuthContext()
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [cost, setCost] = useState("");
    const [description, setDescription] = useState("");
    const [background, setBackground] = useState(null);

    function handleName(event) {
        setName(event.target.value);
    }

    function handleDuration(event) {
        setDuration(event.target.value);
    }

    function handleCost(event) {
        setCost(event.target.value);
    }

    function handleDescription(event) {
        setDescription(event.target.value);
    }

    function handlebackground(event) {
        setBackground(event.target.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("duration", duration);
        formData.append("cost", cost);
        formData.append("description", description);
        if(background!=null){
            formData.append("image", background);
        }

        fetch('http://localhost:3001/api/packages/new', {
            method: "POST",
            headers:{authorization:`Bearer ${user.token}`},
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                alert("Package added");
            })
            .catch(error => {
                console.error(error);
                alert("There was an error adding the package. Please try again later.");
            });
    }

    return (
        <div className="add-new-package-container">
            <p className="add-package-title">Add New Package:</p>

            <form onSubmit={handleSubmit}>
                <div className="add-new-package-inputs">
                    <div className="inputs-top-side">
                        <div className="input_text flex-css">
                            <input type="text" placeholder="Package Name" onChange={handleName} />
                        </div>
                        <div className="package-duration input_text flex-css">
                            <select onChange={handleDuration} >
                                <option selected hidden>Package Duration</option>
                                <option value="2629800000">1 Month</option>
                                <option value="7889400000">3 Months</option>
                                <option value="15778800000">6 Months</option>
                                <option value="31556926000">1 Year</option>
                            </select>
                        </div>
                        <div className="package-price input_text flex-css">
                            <input type="number" placeholder="Package Price" onChange={handleCost} />
                        </div>
                    </div>
                    <div className="inputs-button-side">
                        <div className="package-background input_text flex-css">
                            <input className="package-file-input" type="file" onChange={handlebackground} />
                        </div>
                        <div className="package-description input_text flex-css">
                            <input type="text" placeholder="Package Description" onChange={handleDescription} />
                        </div>
                        <div className="add-package-btn flex-css hover:opacity-80">
                            <button id="add-package-button">Add</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddNewPackage;
