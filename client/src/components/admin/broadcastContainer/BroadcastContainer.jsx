import { useAuthContext } from "../../../hooks/useAuthContext";
import Card from "./broadcastContainerCard";

const BroadcastContainer = ({ broadcast,func }) => {
    const { user } = useAuthContext()

    return (
        <div className="flex flex-wrap gap-4 justify-center mt-10">
            {broadcast.map((item) => (
                <Card key={item._id} item={item} user={user} func={(id)=>func(id)} className="broadcast-container"/>
            ))}
        </div>
    )
}

export default BroadcastContainer;
