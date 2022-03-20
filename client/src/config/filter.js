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
  REFUND: "refund",
  STATUS: "booking_status",
  ORDER_NO: "booking_no",
};

export const ORDER_FILTER_OPTIONS = [
  {
    text: "การคืนเงิน",
    value: OrderOptions.REFUND,
  },
  {
    text: "สถานะการจอง",
    value: OrderOptions.STATUS,
  },
  {
    text: "หมายเลขออเดอร์",
    value: OrderOptions.ORDER_NO,
  }
];

export const CarOptions = {
  ID: "id",
  BRAND: "car_brand",
  SEAT: "car_seat",
  CAR_TYPE: "car_type",
  GEAR_TYPE: "car_transmission",
  REGISTRATE_YEAR:"car_register"
};

export const CAR_FILTER_OPTIONS = [
  {
    text: "CAR ID",
    value: CarOptions.ID,
  },
  {
    text: "ยี่ห้อรถ",
    value: CarOptions.BRAND,
  },
  {
    text: "จำนวนที่นั่ง",
    value: CarOptions.SEAT,
  },
  {
    text: "ประเภทรถ",
    value: CarOptions.CAR_TYPE,
  },
  {
    text: "ประเภทเกียร์",
    value: CarOptions.GEAR_TYPE,
  },
  {
    text: "ปีที่จดทะเบียน",
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