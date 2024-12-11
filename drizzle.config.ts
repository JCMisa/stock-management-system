/* eslint-disable import/no-anonymous-default-export */
/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://account:7pZfvnou4DtP@ep-wild-base-a5shxljb.us-east-2.aws.neon.tech/stock-management-system?sslmode=require",
  },
};
