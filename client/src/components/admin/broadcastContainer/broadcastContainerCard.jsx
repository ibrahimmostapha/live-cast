import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react'
import axios from 'axios';

function Card({ item, func }) {
    const [channel, setChannel] = useState()

    useEffect(() => {
        try {
            axios.get('http://localhost:3001/api/channels/single/' + item.channel)
                .then((res) => { setChannel(res.data) })
        } catch (error) {
            console.log(error)
        }
    }, [])


    return (
        <div className="w-72 h-48 rounded-md flex flex-col justify-between border border-black bg-gray-200  dark:bg-gray-500">
            <div className="h-14 rounded-t-md p-2 border-b border-black bg-amber-400">
                <b>{item.title}</b>
            </div>
            <div className="p-2 flex flex-col">
                <h1>Category: {item.category}</h1>
                <h1>Channel: {channel && channel.name}</h1>
                <h1>Path: {item.path}</h1>
            </div>
            <div className="w-full p-2 flex justify-between bg-amber-400">
                <button className="broadcast-button">
                    Edit
                    <FontAwesomeIcon className="fa-icon ml-1" icon={faPenToSquare}></FontAwesomeIcon>
                </button>

                <button onClick={() => func(item._id)}>
                    Delete
                    <FontAwesomeIcon className="fa-icon ml-1" icon={faTrash}></FontAwesomeIcon>
                </button>

            </div>
        </div>
    )
}

export default Card