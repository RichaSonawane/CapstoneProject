require("dotenv").config();
const { DATABASE_CONFIG } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(DATABASE_CONFIG, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  getList: (req, res) => {
    sequelize
      .query(` select * from list; `)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  createList:(req,res)=>{
    let {day, header,content}=req.body
    sequelize.query(
      `insert into list (day,header,content) values ('${day}','${header}','${content}')returning *;`)
        .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  }
};