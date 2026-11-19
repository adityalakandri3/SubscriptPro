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
      company_name: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING(1),
      },
      status: {
        type: Sequelize.STRING(1),
        comments: ["1=active,2=inactive,3=blocked"],
      },
      is_verified: {
        type: Sequelize.STRING(1),
        comments: ["0=Not Verified,1=Verified"],
      },
      last_login: {
        type: Sequelize.DATE,
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

  const OtpModel = sequelize.define(
    "otpmodel",
    {
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
    },
    {
      tableName: "otp",
      timeStamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  const Plan = sequelize.define(
    "plan",
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      price: {
        type: Sequelize.DECIMAL(6, 2),
      },
      currency: {
        type: Sequelize.STRING(3),
      },
      billing_cycle: {
        type: Sequelize.STRING(1),
        comments: ["1=MONTHLY,2=YEARLY"],
      },
      trial_days: {
        type: Sequelize.INTEGER,
      },
      active: {
        type: Sequelize.STRING(1),
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    },
    {
      tableName: "plans",
      timeStamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  const PlanFeature = sequelize.define(
    "planfeature",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      plan_id: {
        type: Sequelize.INTEGER,
      },
      feature_name: {
        type: Sequelize.STRING,
      },
      feature_value: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    },
    {
      tableName: "plan_features",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  const Subscription = sequelize.define(
    "subscription",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      plan_id: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING(1),
        comments: ["1=Trialing,2=Active,3=Past_due,4=Cancelled,5=Expired"],
      },
      plan_price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      currency: {
        type: Sequelize.STRING,
      },
      start_date: {
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      trial_start_date: {
        type: Sequelize.DATE,
      },
      trial_end_date: {
        type: Sequelize.DATE,
      },
      current_period_start: {
        type: Sequelize.DATE,
      },
      current_period_end: {
        type: Sequelize.DATE,
      },
      next_billing_date: {
        type: Sequelize.DATE,
      },
      cancelled_at: {
        type: Sequelize.DATE,
      },
      cancel_at_period_end: {
        type: Sequelize.DATE,
      },
      ended_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    },
    {
      tableName: "subscriptions",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  const Payments = sequelize.define(
    "payment",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      subscription_id: {
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      currency: {
        type: Sequelize.STRING,
      },
      provider: {
        type: Sequelize.STRING(1),
        comments: ["1=razorPay"],
      },
      provider_order_id: {
        type: Sequelize.STRING,
      },
      provider_payment_id: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING(1),
        comments: ["1=Pending,2=Success,3=Failed,4=Refunded"],
      },
      failure_reason: {
        type: Sequelize.TEXT,
      },
      trial_end_date: {
        type: Sequelize.DATE,
      },
      paid_date: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    },
    {
      tableName: "payments",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  const Invoices = sequelize.define(
    "invoice",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      subscription_id: {
        type: Sequelize.INTEGER,
      },
      payment_id: {
        type: Sequelize.INTEGER,
      },
      invoice_number: {
        type: Sequelize.STRING,
      },
      subtotal: {
        type: Sequelize.DECIMAL(10, 2),
      },
      tax_amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      total_amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      currency: {
        type: Sequelize.STRING(3),
      },
      status: {
        type: Sequelize.STRING(1),
        comments: ["1=Issued,2=void"],
      },
      issued_at: {
        type: Sequelize.DATE,
      },
      due_at: {
        type: Sequelize.DATE,
      },
      pdf_url: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    },
    {
      tableName: "invoices",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  return {
    User,
    OtpModel,
    Plan,
    PlanFeature,
    Subscription,
    Payments,
    Invoices,
  };
};
