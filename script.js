// Started at 11:09 6-6-2022

const mongoose = require("mongoose");
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useUnifiedTopology', true);

class Database {

    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect("mongodb+srv://admin:Ifarted1!@twitterclonecluster.cl70w.mongodb.net/TwitterCloneDB?retryWrites=true&w=majority")
        .then(() => {
            console.log("database connection successful");
        }) 
        .catch((err) => {
            console.log("database connection error " + err);
        })
    }
}

module.exports = new Database()

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String, required: true, trim: true, },
    lastName: { type: String, required: true, trim: true, },
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, },
    profilePic: { type: String, default: "/images/profilePic.png", },
});

var User = mongoose.model('User', UserSchema);
module.exports = User;


:root {
    --blue: #1FA2F1;
    --buttonHoverBG: #d4edff;
    --lightGrey: rgb(230, 236, 240);
    --spacing: 15px;
    --blueLight: #9BD1F9;
    --greyText: rgb(101, 119, 134);
    --greyButtonText: rgba(0,0,0,0.34)
}

* {
    outline: none !important;
}

a {
    color: inherit;
}

a:hover{
    color: inherit;
    text-decoration: none;
}

h1 {
    font-size: 19px;
    font-weight: 800;
    margin: 0;
}

nav {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: 100%;
}

nav a {
    padding: 10px;
    font-size: 30px;
    width: 55px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #212529;
}

nav a.blue {
    color: var(--blue);
}

nav a:hover {
    background-color: var(--buttonHoverBG);
    color: var(--blue);
    border-radius: 50%;
}

button {
    background-color: transparent;
    border: none;
    color: var(--greyButtonText);
}

.mainSectionContainer {
    padding: 0;
    border-left: 1px solid var(--lightGrey);
    border-right: 1px solid var(--lightGrey);
    display: flex;
    flex-direction: column;
}

.titleContainer {
    height: 53px;
    padding: 0 var(--spacing);
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--lightGrey);
    flex-shrink: 0;
}

.titleContainer h1 {
    flex: 1;
}

.postFormContainer {
    display: flex;
    padding: var(--spacing);
    border-bottom: 10px solid rgb(230, 236, 240);
    flex-shrink: 0;
}

.userImageContainer {
    width: 50px;
    height: 50px;
}

.userImageContainer img {
    width: 100%;
    border-radius: 50%;
    background-color: white;
}

.textareaContainer {
    flex: 1;
    padding-left: var(--spacing);
}

.textareaContainer textarea {
    width: 100%;
    border: none;
    resize: none;
    font-size: 19px;
}

#submitPostButton {
    background-color: var(--blue);
    color: white;
    border: none;
    border-radius: 40px;
    padding: 7px 15px;
}

#submitPostButton:disabled {
    background-color: var(--blueLight);
}

.post {
    display: flex;
    flex-direction: column;
    padding: var(--spacing);
    cursor: pointer;
    border-bottom: 1px solid var(--lightGrey);
    flex-shrink: 0;
}

.mainContentContainer {
    flex: 1;
    display: flex;
}

.postContentContainer {
    padding-left: var(--spacing);
    display: flex;
    flex-direction: column;
    flex: 1;
}

.username,
.date {
    color: var(--greyText);
}

.displayName {
    font-weight: bold;
}

.postFooter {
    display: flex;
    align-items: center;
}

.postFooter .postButtonContainer {
    flex: 1;
    display: flex;
}

.postFooter .postButtonContainer button {
    padding: 2px 5px;
}

.header a:hover {
    text-decoration: underline;
}

.header a,
.header span {
    padding-right: 5px;
}

.postButtonContainer button:hover {
    background-color: #d4edff;
    color: var(--blue);
    border-radius: 50%;
}


const express = require('express');
const app = express();
const port = 3003;
const middleware = require('./middleware')
const path = require('path')
const bodyParser = require("body-parser")
const mongoose = require("./database");
const session = require("express-session");

const server = app.listen(port, () => console.log("Server listening on port " + port));

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "bbq chips",
    resave: true,
    saveUninitialized: false
}))

// Routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');
const logoutRoute = require('./routes/logout');

// Api routes
const postsApiRoute = require('./routes/api/posts');

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);

app.use("/api/posts", postsApiRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {

    var payload = {
        pageTitle: "Home",
        userLoggedIn: req.session.user
    }

    res.status(200).render("home", payload);
})

const express = require('express');
const app = express();
const port = 3003;
const middleware = require('./middleware')
const path = require('path')
const bodyParser = require("body-parser")
const mongoose = require("./database");
const session = require("express-session");

const server = app.listen(port, () => console.log("Server listening on port " + port));

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "bbq chips",
    resave: true,
    saveUninitialized: false
}))

// Routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');
const logoutRoute = require('./routes/logout');

// Api routes
const postsApiRoute = require('./routes/api/posts');

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);

app.use("/api/posts", postsApiRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {

    var payload = {
        pageTitle: "Home",
        userLoggedIn: req.session.user
    }

    res.status(200).render("home", payload);
})


mixin createPostForm(userLoggedIn)
    .postFormContainer
        .userImageContainer
            img(src=userLoggedIn.profilePic, alt="User's profile picture")
        .textareaContainer
            textarea#postTextarea(placeholder="What's happening?")
            .buttonsContainer
                button#submitPostButton(disabled="") Post
                
$("#postTextarea").keyup(event => {
    var textbox = $(event.target);
    var value = textbox.val().trim();

    var submitButton = $("#submitPostButton");

    if(submitButton.length == 0) return alert("No submit button found");

    if(value == "") {
        submitButton.prop("disabled", true);
        return;
    }

    submitButton.prop("disabled", false);
})

$("#submitPostButton").click(() => {
    var button = $(event.target);
    var textbox = $("#postTextarea");

    var data = {
        content: textbox.val(),
    }

    $.post("/api/posts", data, postData => {
        
        var html = createPostHtml(postData);
        $(".postsContainer").prepend(html);
        textbox.val("");
        button.prop("disabled", true);
    })
})

function createPostHtml(postData) {

    var postedBy = postData.postedBy;
    var displayName = postedBy.firstName + " " + postedBy.lastName;
    var timestamp = postData.createdAt;

    return `<div class='post'>

                <div class='mainContentContainer'>
                    <div class='userImageContainer'>
                        <img src='${postedBy.profilePic}'>
                    </div>
                    <div class='postContentContainer'>
                        <div class='header'>
                            <a href='/profile/${postedBy.username}' class='displayName'>${displayName}</a>
                            <span class='username'>@${postedBy.username}</span>
                            <span class='date'>${timestamp}</span>
                        </div>
                        <div class='postBody'>
                            <span>${postData.content}</span>
                        </div>
                        <div class='postFooter'>
                            <div class='postButtonContainer'>
                                <button>
                                    <i class='far fa-comment'></i>
                                </button>
                            </div>
                            <div class='postButtonContainer'>
                            <button>
                                <i class='fas fa-retweet'></i>
                            </button>
                            </div>
                            <div class='postButtonContainer'>
                            <button>
                                <i class='far fa-heart'></i>
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}


const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const User = require('../../schemas/UserSchema');
const Post = require('../../schemas/PostSchema');

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    
})

router.post("/", async (req, res, next) => {

    if (!req.body.content) {
        console.log("Content param not sent with request"); 
        return res.sendStatus(400);
    }

    var postData = {
        content: req.body.content,
        postedBy: req.session.user
    }

    Post.create(postData)
    .then(async newPost => {
        newPost = await User.populate(newPost, { path: "postedBy" })

        res.status(201).send(newPost);
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })
})

module.exports = router;

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    content: { type: String, trim: true },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    pinned: Boolean
}, { timestamps: true });

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;


body {
    background-color: #0099ff;
}

.wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.loginContainer {
    padding: 20px;
    width: 80%;
    max-width: 500px;
    border: 1px solid #dedede;
    background-color: #fff;
    text-align: center;
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    -webkit-box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    -moz-box-shadow: 0 1px 4px rgba(0,0,0,0.3);
}

form {
    display: flex;
    flex-direction: column;
}

input[type="text"],
input[type="email"],
input[type="password"] {
    margin-bottom: 20px;
    padding: 5px 10px;
    border-radius: 2px;
    border: 1px solid #dedede;
    background-color: #f2f2f2;
}

input[type="submit"] {
    background-color: #0099ff;
    color: #fff;
    border: none;
    border-radius: 2px;
    margin-bottom: 10px;
}


const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const User = require('../schemas/UserSchema');

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    
    res.status(200).render("login");
})

router.post("/", async (req, res, next) => {

    var payload = req.body;

    if(req.body.logUsername && req.body.logPassword) {
        var user = await User.findOne({
            $or: [
                { username: req.body.logUsername },
                { email: req.body.logUsername }
            ]
        })
        .catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong.";
            res.status(200).render("login", payload);
        });
        
        if(user != null) {
            var result = await bcrypt.compare(req.body.logPassword, user.password);

            if(result === true) {
                req.session.user = user;
                return res.redirect("/");
            }
        }

        payload.errorMessage = "Login credentials incorrect.";
        return res.status(200).render("login", payload);
    }

    payload.errorMessage = "Make sure each field has a valid value.";
    res.status(200).render("login");
})

module.exports = router;


const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const User = require('../schemas/UserSchema');

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {

    if(req.session) {
        req.session.destroy(() => {
            res.redirect("/login");
        })
    }
})

module.exports = router;


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "/images/profilePic.jpeg" },
}, { timestamps: true });

var User = mongoose.model('User', UserSchema);
module.exports = User;


// Ended at 7:20 6-6-2022
