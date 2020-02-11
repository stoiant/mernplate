use admin
db.createUser({
  user: "admin",
  pwd: "Password",
  roles: [{
    role: "userAdminAnyDatabase",
    db: "admin"
  }]
})
use nfl
db.createUser({
  user: "therush",
  pwd: "l3tmEp4ss",
  roles: [{
    role: "dbOwner",
    db: "nfl"
  }]
}, {
  w: "majority",
  wtimeout: 5000
});
db.nfl.insert({
  "just": " a test"
})
