const sql = require("..db-connector");

const Member = function(member) {
    this.name = member.name;
    this.address = member.address;
    this.phone = member.phone;
};

Member.create = (newMember, result) => {
    sql.query("INSERT INTO Members SET ?", newMember, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        console.log('created member');
        result(null, {id: res.insertId});
    });
};

Member.getAll = (result) => {
    let query = "SELECT * FROM Members";
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("members: ", res);
      result(null, res);
    });
  };