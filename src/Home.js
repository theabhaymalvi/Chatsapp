import "./styles.css"
import { useState } from "react";

const Home = ({onJoin}) => {
    let [username,setUsername] = useState(null);
    let [room,setRoom] = useState("Friends");

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {username, room};
        onJoin(user);
    }

    return(
        <div className="join-container">
        <div className="join-header">
            <h1>ChatsApp</h1>
        </div>
        <div className="join-main">
            <form onSubmit={handleSubmit}>
            <div className="form-control">
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Enter username..."
                    onChange={(e) => {setUsername(e.target.value)}}
                    required
                />
            </div>
            <div className="form-control">
                <label>Room</label>
                <select name="room" id="room" onChange={(e) => setRoom(e.target.value)}>
                    <option value="Friends">Friends</option>
                    <option value="Family">Family</option>
                    <option value="Together Forever">Together Forever</option>
                    <option value="Girls Gang">Girls Gang</option>
                    <option value="Boys Gang">Boys Gang</option>
                </select>
            </div>
            <button type="submit" className="btn"> Join Chat </button>
            </form>
        </div>
        </div>
    )
}

export default Home;