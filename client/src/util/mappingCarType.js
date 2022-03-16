const mappingCarType = (cartype) => {
  switch (cartype) {
    case "eco":
      return "อีโคคาร์";
      break;
    case "small":
      return "รถขนาดเล็ก";
      break;
    case "medium":
      return "รถขนาดกลาง";
      break;
    case "suv":
      return "เอสยูวี";
      break;
    case "hybrid":
      return "hybrid";
      break;
    case "van":
      return "รถตู้";
      break;
    case "trucks":
      return "รถกระบะ";
      break;
    case "luxury":
      return "Luxury";
      break;
    default:
      return cartype;
  }
};

export default mappingCarType;

