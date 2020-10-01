const e = require("express");
const db = require("./data/dbHelpers")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const cors = require('cors');
const secrets = require("./config/secrets")
const restrict = require("./auth/restricted-middleware")

const server = e();
const port = process.env.PORT || 3000;
server.use(e.json());
server.use(cors())


server.get("/api/users", restrict, (req, res) =>{
    const {department, id} = req.decodedToken;

    if(department === "admin"){
        db.get()
        .then(users =>{
            res.status(200).json(users)
        })
        .catch(err =>{
            res.status(500).json({"err":"no users"})
        })
    } else{
        db.get(id)
            .then(user =>{
                res.status(200).json(user)
            })
            .catch(err =>{
                res.status(500).json(err)
            })
    }
   
})

server.post("/api/register", (req, res) =>{
    if (req.body.Username !== undefined 
            && req.body.Password !== undefined 
            && req.body.Department !== undefined) {
                const hash = bcrypt.hashSync(req.body.Password, 14);
                req.body.Password = hash;
                db.insert(req.body)
                    .then(user => {
                        const token = generateJWT(user);
                        res.status(201).json({
                            "token":token
                        })
                    })
                    .catch(err =>{
                        res.status(500).json(err)
                    })
            } else{
                res.status(401).json({err:"no body"})
            }
}) 

server.post("/api/login", (req, res)=>{
    if(req.body.Username !== undefined 
        && req.body.Password !== undefined){
            const username = req.body.Username;
            db.getByUsername(username).then(user =>{
                    if(user && bcrypt.compareSync(req.body.Password, user.Password)){
                        const token = generateJWT(user);

                        res.status(200).json({
                            "token": token
                        })
                    } else {
                        res.status(401).json({"err":"invalid crendentials"})
                    }
                })
    } else {
        res.status(500).json({"err": "can't login"})
    }
})

function generateJWT(user){
    const payload = {
        subject:user.id,
        username:user.Username,
        department:user.Department
    };
    const options = {
        expiresIn: '1d'
    };
    return jwt.sign(payload, secrets.JWT, options);
}

server.listen(port, () =>{
    console.log("server is working");
})