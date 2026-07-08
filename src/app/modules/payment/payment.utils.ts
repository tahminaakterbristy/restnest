import SSLCommerzPayment from "sslcommerz-lts";

const store_id = process.env.STORE_ID!;
const store_passwd = process.env.STORE_PASSWORD!;
const is_live = false;

export const sslcz = new SSLCommerzPayment(
  store_id,
  store_passwd,
  is_live
);