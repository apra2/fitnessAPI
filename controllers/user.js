const bcrypt = require('bcrypt');
const User = require("../models/User.js");
const auth = require("../auth");

module.exports.registerUser = (req, res) => {
    if (!req.body.email.includes("@")) {
        return res.status(400).send({ error: "Email invalid" });
    } else if (req.body.password.length < 8) {
        return res.status(400).send({ error: "Password must be at least 8 characters" });
    } else {
        let newUser = new User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        });

        return newUser.save()
            .then(() => res.status(201).send({ message: "Registered Successfully" }))
            .catch(err => {
                console.error("Error in saving: ", err);
                return res.status(500).send({ error: "Error in save" });
            });
    }
};

module.exports.loginUser = (req, res) => {
    if (req.body.email.includes("@")) {
        return User.findOne({ email: req.body.email })
            .then(result => {
                if (result == null) {
                    return res.status(404).send({ error: "No Email Found" });
                } else {
                    const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
                    if (isPasswordCorrect) {
                        return res.status(200).send({ access: auth.createAccessToken(result) });
                    } else {
                        return res.status(401).send({ message: "Email and password do not match" });
                    }
                }
            })
            .catch(err => {
                console.error("Error in login: ", err);
                return res.status(500).send({ error: "Failed to log in" });
            });
    } else {
        return res.status(400).send({ error: "Invalid email format" });
    }
};

// Get User Details
module.exports.getUserDetails = async (req, res) => {
    try {
        console.log(req.user);
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        } else {
            user.password = '';
            return res.status(200).send(user);
        }
    } catch (error) {
        errorHandler(error, req, res);
    }
};
