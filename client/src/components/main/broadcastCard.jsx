import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Card(props) {
    const [channel, setChannel] = useState()
    const [isLoading, setLoading] = useState()

    useEffect(() => {
        try {
            axios.get('http://localhost:3001/api/channels/single/' + props.content.channel)
                .then((res) => { setChannel(res.data) })
        } catch (error) {
            console.log(error)
        }
    }, [])


    return (
        <div className="w-80 aspect-video bg-gradient-to-b from-amber-700 to-amber-600 dark:from-stone-700 dark:to-stone-800 px-4 pt-4 rounded 
                shadow-lg">
            <div className="flex items-center mb-4">
                {channel && <Link to={`/channels/${channel._id}`}>
                        <img
                        className="w-10 h-10 rounded-full"
                        src={`http://localhost:3001/${channel.logo}`}
                        alt="Channel Logo"/>
                    </Link>}
                <div className="ml-2">
                    {channel && <Link to={`/channels/${channel._id}`} className="text-white text-lg font-bold">{channel.name}</Link>}
                    <p className="text-gray-400">{props.content.category}</p>
                </div>
            </div>
            <Link to={`/watch/${props.content.path}`}>
                <img
                    className="w-full h-48 object-cover rounded hover:brightness-50 transition-all border border-black dark:border-white"
                    src={`https://i.ytimg.com/vi/${props.content.path}/mqdefault.jpg`}
                    alt="Game thumbnail"
                />
            </Link>
            <div className="my-4">
                <h3 className="text-white text-lg font-bold mb-2">{props.content.title}</h3>
            </div>
        </div>
    )
}

export default Card