import "./sideBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBox, faTowerBroadcast, faTv, faScrewdriverWrench, faHouse, faGears } from '@fortawesome/free-solid-svg-icons';


function SideBar(props) {
    return (
        <div className="flex flex-col w-72 h-full bg-gray-200
        sidebar-menu">
            <ul>
                <li className='kabse bg-orange-900 text-white pointer-events-none'>
                    <span><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon></span>
                    <button>
                        Dashboard
                    </button>
                </li>
                <li
                    className={`kabse bg-gray-200 hover:bg-gray-300 ${props.state == "dashboard" ? "text-orange-900 bg-gray-300" : "text-black"}`}
                    onClick={() => props.function("dashboard")} >
                    <span><FontAwesomeIcon icon={faGears}></FontAwesomeIcon></span>
                    <button>
                        General Info
                    </button>
                </li>
                <li
                    className={`kabse bg-gray-200 hover:bg-gray-300 ${props.state == "channels" ? "text-orange-900 bg-gray-300" : "text-black"}`}
                    onClick={() => props.function("channels")} >
                    <span><FontAwesomeIcon icon={faTv}></FontAwesomeIcon></span>
                    <button>
                        Channels
                    </button>
                </li>
                <li
                    className={`kabse bg-gray-200 hover:bg-gray-300 ${props.state == "broadcasts" ? "text-orange-900 bg-gray-300" : "text-black"}`}
                    onClick={() => props.function("broadcasts")}>
                    <span><FontAwesomeIcon icon={faTowerBroadcast}></FontAwesomeIcon></span>
                    <button>
                        Broadcasts
                    </button>
                </li>
                <li
                    className={`kabse bg-gray-200 hover:bg-gray-300 ${props.state == "users" ? "text-orange-900 bg-gray-300" : "text-black"}`}
                    onClick={() => props.function("users")}>
                    <span><FontAwesomeIcon icon={faUsers}></FontAwesomeIcon></span>
                    <button>
                        Users
                    </button>
                </li>
                <li
                    className={`kabse bg-gray-200 hover:bg-gray-300 ${props.state == "admins" ? "text-orange-900 bg-gray-300" : "text-black"}`}
                    onClick={() => props.function("admins")}>
                    <span><FontAwesomeIcon icon={faScrewdriverWrench}></FontAwesomeIcon></span>
                    <button>
                        Admins
                    </button>
                </li>
                <li
                    className={`kabse bg-gray-200 hover:bg-gray-300 ${props.state == "packages" ? "text-orange-900 bg-gray-300" : "text-black"}`}
                    onClick={() => props.function("packages")}>
                    <span><FontAwesomeIcon icon={faBox}></FontAwesomeIcon></span>
                    <button>
                        Packages
                    </button>
                </li>
            </ul>


        </div>
    )
}

export default SideBar;
