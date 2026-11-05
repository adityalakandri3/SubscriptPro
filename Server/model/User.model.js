module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      f_name: {
        type: Sequelize.STRING,
      },
      l_name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING(1),
        comments: ["1=active,2=inactive"],
      },
      is_verified: {
        type: Sequelize.STRING(1),
        comments: ["1=active,2=inactive"],
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    },
    {
      tableName: "users",
      timeStamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  const OtpModel = sequelize.define("otpmodel", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    otp: {
      type: Sequelize.INTEGER,
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  },  {
      tableName: "otp",
      timeStamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },);

  return { User,OtpModel };
};
