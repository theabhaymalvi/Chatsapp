const users = [];

// Join new User
const userJoin = (id, username, room) => {
    const user = {id, username, room};
    //push in users array
    users.push(user);
    return user;
}

// Leave user
const userLeave = (id) => {
    let idx = users.findIndex(user => user.id === id);

    if(idx!==-1) return users.splice(idx, 1)[0];
}

// Get Current User
const getCurUser = (id) => {
    return users.find(user => user.id === id);
}

// Get all users
const roomUsers = (room) => {
    return users.filter(user => user.room === room);
}

module.exports = {userJoin, userLeave, getCurUser, roomUsers};