export const CustomerOptions = {
  FIRST_NAME: -1,
  LAST_NAME: 0,
  PHONE_NUMBER: 1,
  EMAIL: 2,
  ID: 3,
};

export const CUSTOMER_FILTER_OPTIONS = [
  {
    text: "ชื่อ",
    value: CustomerOptions.FIRST_NAME,
  },
  {
    text: "นามสกุล",
    value: CustomerOptions.LAST_NAME,
  },
  {
    text: "เบอร์โทร",
    value: CustomerOptions.PHONE_NUMBER,
  },
  {
    text: "อีเมล",
    value: CustomerOptions.EMAIL,
  },
  {
    text: "ID",
    value: CustomerOptions.ID,
  },
];

export const CancelOptions = {
  FIRST_NAME: -1,
  LAST_NAME: 0,
  ORDER_NO: 1,
};

export const CANCEL_FILTER_OPTIONS = [
  {
    text: "ชื่อ",
    value: CancelOptions.FIRST_NAME,
  },
  {
    text: "นามสกุล",
    value: CancelOptions.LAST_NAME,
  },
  {
    text: "หมายเลขออเดอร์",
    value: CancelOptions.ORDER_NO,
  }
];