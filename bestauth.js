// © 2024 - BestDeveloper - BestMat, Inc. - All rights reserved.
import fetch from "node-fetch";

function Authentication(config) {
    var username = config.username;
    var password = config.password;
    var api_key = config.api_key;

    return {
        getUsers: async function(users = undefined) {
            var response =  await fetch("http://localhost:3000/auth-users");
            var data = await response.json();

            if (users != undefined && typeof users == "number") return (data[username].users).slice(0, users);
            return data[username].users;
        },
        createUser: async function(config) {
            var response =  await fetch(`http://localhost:3000/auth-create-user?email=${config.email}&password=${config.password}&user=${username}`);
            var data = await response.text();

            if (data == "Success!") return 200;
        },
        validateUser: async function(config) {
            var response =  await fetch("http://localhost:3000/auth-users");
            var data = await response.json();

            if (data[username].passwords[data[username].users.indexOf(config.email)] == config.password) {
                return 200;
            } else {
                return 404;
            }
        },
        user: username
    };
}

var auth = Authentication({
    username: "tayoyuva",
    password: "tayoyuva",
    api_key: "tayoyuva"
});

var users = await auth.getUsers();
console.log(users);

// auth.createUser({
//     email: "test@from.javascript",
//     password: "password"
// });

var signin = await auth.validateUser({
    email: "tayoyuva@gmail.com",
    password: "Admin123@"
});

console.log(signin);