const db = require("../config/dbConfig")

module.exports = {
    get,
    insert,
    getByUsername
}

function get(id){
    const query = db("User")

    if(id){
        return query
            .where("id", id)
            .first()
            .then(user => {
                if(user){
                    return user;
                } else {
                    return null;
                }
            })
    } else {
        return query
        .then(users =>{
            return users;
        })
    }
}

function getByUsername(username){
    return db("User")
        .where("Username", username)
        .first()
        .then(user =>{
            if(user){
                return user;
            } else {
                return null;
            }
            
        })
}

function insert(data){
    const query = db("User")

    return query
        .insert(data, 'id')
        .then(([id])=>{
            return get(id)
        })
}