const mappingBookingStatus = (value) => {
    switch (value) {
        case "ชำระเงินแล้ว":
          return "รอตรวจสอบ";
          break;
        case "ตรวจสอบแล้ว":
          return "รอรับรถ";
          break;
        case "คืนรถแล้ว":
          return "การเช่าเสร็จสิ้น";
          break;
        case "ยกเลิก":
          return "ยกเลิกแล้ว";
          break;
        default:
          return value;
      }
};

export default mappingBookingStatus;
