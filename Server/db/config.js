const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASS,
  {
    host: process.env.DBHOST || "localhost",
    port: process.env.DBPORT || 3306,
    dialect: process.env.DBDIALECT || "mysql",
    timezone: "+05:30",
    pool: {
      max: 30,
      min: 0,
      acquire: 50000,
      idle: 10000,
    },
    logging: process.env.DBLOGGING === "true" ? console.log : false,
  },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const { User, OtpModel, Plan, PlanFeature, Subscription, Payments, Invoices } =
  require("../model/subscription.model")(sequelize, Sequelize);
db.User = User;
db.OtpModel = OtpModel;
db.Plan = Plan;
db.PlanFeature = PlanFeature;
db.Subscription = Subscription;
db.Payments = Payments;
db.Invoices = Invoices;

db.PlanFeature.belongsTo(db.Plan,{foreignKey:"plan_id",targetKey:"id"})
db.Plan.hasmany(db.PlanFeature,{foreignKey:"plan_id",sourceKey:"id"})

db.Subscription.belongsTo(db.User,{foreignKey:"user_id",targetKey:"id"})
db.User.hasmany(db.Subscription,{foreignKey:"user_id",sourceKey:"id"})

db.Subscription.belongsTo(db.Plan,{foreignKey:"plan_id",targetKey:"id"})
db.Plan.hasmany(db.Subscription,{foreignKey:"plan_id",sourceKey:"id"})

db.Payments.belongsTo(db.User,{foreignKey:"user_id",targetKey:"id"})
db.User.hasmany(db.Payments,{foreignKey:"user_id",sourceKey:"id"})

db.Payments.belongsTo(db.Subscription,{foreignKey:"subscription_id",targetKey:"id"})
db.Subscription.hasmany(db.Payments,{foreignKey:"subscription_id",sourceKey:"id"})

db.Invoices.belongsTo(db.User,{foreignKey:"user_id",targetKey:"id"})
db.User.hasmany(db.Invoices,{foreignKey:"user_id",sourceKey:"id"})

db.Invoices.belongsTo(db.Subscription,{foreignKey:"subscription_id",targetKey:"id"})
db.Subscription.hasmany(db.Invoices,{foreignKey:"subscription_id",sourceKey:"id"})

db.Invoices.belongsTo(db.Payments,{foreignKey:"payment_id",targetKey:"id"})
db.Payments.hasmany(db.Invoices,{foreignKey:"payment_id",sourceKey:"id"})

module.exports = db;
