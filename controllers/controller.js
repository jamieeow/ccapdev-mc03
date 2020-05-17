const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/`. This displays `home.hbs` with all contacts
            current stored in the database.
    */
    getIndex: function(req, res) {
        // your code here

        console.log('index before query')

        User.find({}, (err, data) => {
            if (err) throw err;

            const userObject = []

            data.forEach( doc => {
                userObject.push(doc.toObject());
                console.log(doc.toString())
            })

            res.render('home', {users: userObject}); // This is to load the page initially 
        })
        
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getCheckNumber`. This function checks if a
            specific number is stored in the database. If the number is
            stored in the database, it returns an object containing the
            number, otherwise, it returns an empty string.
    */
    getCheckNumber: function(req, res) {
        // your code here
        console.log('atleast?')

        User.find({number: req.query.number}, (err, data) => {
            if (err) {
                console.log(err)
            }

            if (!data) {
                console.log('yes')
                res.send('')
            }
            console.log('you looked')

            res.send(data[0])
        })
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getAdd`. This function adds the contact sent
            by the client to the database, then appends the new contact to the
            list of contacts in `home.hbs`.
    */
    getAdd: function(req, res) {
        // your code here

        let newUser = new User({
            name: req.query.name,
            number: req.query.number
        })

        console.log('will add rn')

        newUser.save( (err, user) => {
            let result;
            if (err) {
                console.log(err.errors)

                result = {
                    success: false,
                    message: 'User was not created'
                }

                res.send(result)
            }                                     

            res.send(user.toObject())
        })

        
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getDelete`. This function deletes the contact
            from the database, then removes the contact to the list of
            contacts in `home.hbs`.
    */
    getDelete: function (req, res) {
        // your code here

        User.deleteOne({number: req.query.number}, (err,data) => {
            if (err) throw err;
            
            else
                res.send(data);
        })
    }

}

module.exports = controller;
