export const CustomerOptions = {
  FIRST_NAME: "first_name",
  LAST_NAME: "last_name",
  PHONE_NUMBER: "phone_number",
  EMAIL: "email",
  ID: 'id',
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

export const OrderOptions = {
  FIRST_NAME: -1,
  LAST_NAME: 0,
  ORDER_NO: 1,
};

export const ORDER_FILTER_OPTIONS = [
  {
    text: "ชื่อ",
    value: OrderOptions.FIRST_NAME,
  },
  {
    text: "นามสกุล",
    value: OrderOptions.LAST_NAME,
  },
  {
    text: "หมายเลขออเดอร์",
    value: OrderOptions.ORDER_NO,
  }
];

export const CarOptions = {
  ID: -1,
  BRAND: 0,
  SEAT: 1,
  CAR_TYPE: 2,
  GEAR_TYPE: 3,
  REGISTRATE_YEAR:4
};

export const CAR_FILTER_OPTIONS = [
  {
    text: "CAR ID",
    value: CarOptions.ID,
  },
  {
    text: "CAR Brand",
    value: CarOptions.BRAND,
  },
  {
    text: "Seat",
    value: CarOptions.SEAT,
  },
  {
    text: "CAR Type",
    value: CarOptions.CAR_TYPE,
  },
  {
    text: "Gear",
    value: CarOptions.GEAR_TYPE,
  },
  {
    text: "Year",
    value: CarOptions.REGISTRATE_YEAR,
  },
];

export const LocationOptions = {
  ID: "id",
  PROVINCE: "province",
  LOCATION: "location"
};

export const LOCATION_FILTER_OPTIONS = [
  {
    text: "ID",
    value: LocationOptions.ID,
  },
  {
    text: "Province",
    value: LocationOptions.PROVINCE,
  },
  {
    text: "Location",
    value: LocationOptions.LOCATION,
  }
];