const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("server/db.json");
const middlewares = jsonServer.defaults();
// const db = require('./db.json');
const fs = require("fs");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/login", (req, res, next) => {
  const users = readUsers();

  const user = users.filter(
    u => u.email === req.body.email && u.password === req.body.password
  )[0];

  if (user) {
    res.send({ ...formatUser(user) });
  } else {
    res.status(401).send("Incorrect username or password");
  }
});

// server.post("/register", (req, res) => {
//   const users = readUsers();
//   const user = users.filter(u => u.email === req.body.email)[0];

//   if (user === undefined || user === null) {
//     res.send({
//       ...formatUser(req.body)
//     });
//     db.users.push(req.body);
//   } else {
//     res.status(500).send("User already exists");
//   }
// });

// server.get("/vacations/:id", (req, res) => {
//   const usersVacations = readUsersVacations();
//   const id = parseInt(req.params.id);

//   const userVactions = usersVacations.filter(u => u.userid === id);

//   res.send(userVactions);
// });

// server.post("/addVacation", (req, res) => {
//   const obj = JSON.stringify(req.body)
//   console.log(req.body)
  
//   db.get('usersVacations')
//     .push(obj)
//     .write().then(()=>{
//       console.log(readUsersVacations())
//       res.send(readUsersVacations());
//     })

// })

server.use(router);
server.listen(3001, () => {
  console.log("JSON Server is running");
});

function formatUser(user) {
  delete user.password;
  return user;
}

function readUsers() {
  const dbRaw = fs.readFileSync("./server/db.json");
  const users = JSON.parse(dbRaw).users;
  return users;
}

function readUsersVacations() {
  const dbRaw = fs.readFileSync("./server/db.json");
  const usersVacations = JSON.parse(dbRaw).usersVacations;
  return usersVacations;
}
