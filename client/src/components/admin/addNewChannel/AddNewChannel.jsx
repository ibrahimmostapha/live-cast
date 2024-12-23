import "./addNewChannel.css";
import { useState } from 'react';
import { useAuthContext } from "../../../hooks/useAuthContext";

function AddNewChannel() {
  const { user } = useAuthContext()
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);

  function handleName(event) {
    setName(event.target.value);
  }

  function handleLogo(event) {
    setLogo(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(); // we use FormData because we are sending string & file
    formData.append("name", name);
    formData.append("image", logo);

    fetch('http://localhost:3001/api/channels/new', {
      method: "POST",
      body: formData,
      headers: { authorization: `Bearer ${user.token}` }
    })
      .then(response => response.json())
      .then(data => {
        alert("Channel added");
      })
      .catch(error => {
        console.error(error);
        alert("There was an error adding the channel. Please try again later.");
      });
  }

  return (
    <div className="add-new-channel-container">
      <p className="add-channel-title">Add New Channel:</p>

      <form onSubmit={handleSubmit}>
        <div className="add-new-channel-inputs">
          <div className="inputs-top-side">
            <div className="input_text flex-css">
              <input type="text" placeholder="Channel Name" value={name} onChange={handleName} />
            </div>
          </div>
          <div className="inputs-button-side">
            <div className="flex-css">
              <input className="custom-file-input" type="file" onChange={handleLogo} />
            </div>
            <div className="add-channel-btn flex-css hover:opacity-80">
              <button id="add-channel-button">Add</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddNewChannel;
