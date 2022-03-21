import {
  AppstoreOutlined,
  TeamOutlined,
  ProfileOutlined,
  CarOutlined,
  CloseCircleOutlined,
  PoweroffOutlined,
  UserOutlined,
  KeyOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import MapIcon from '@mui/icons-material/Map';

export const MenuList = [
  // {
  //   id: 1,
  //   nameEN: "Dashboard",
  //   nameTH: "หน้ารวมสรุปผล",
  //   path: "/dashboard",
  //   icon: <AppstoreOutlined />,
  // },
  {
    id: 2,
    nameEN: "Customer",
    nameTH: "รายชื่อลูกค้า",
    path: "/customer",
    icon: <TeamOutlined />,
  },
  {
    id: 3,
    nameEN: "Order",
    nameTH: "รายการออเดอร์จองรถ",
    path: "/order",
    icon: <ProfileOutlined />,
  },
  {
    id: 4,
    nameEN: "Management cars",
    nameTH: "จัดการข้อมูลรถเช่า",
    path: "/management",
    icon: <CarOutlined />,
  },
  {
    id: 5,
    nameEN: "Management locations",
    nameTH: "จัดการสถานที่รับและคืนรถ",
    path: "/location",
    icon: <MapIcon />,
  },
  // {
  //   id: 6,
  //   nameEN: "Cancel order",
  //   nameTH: "รายการยกเลิกการจอง",
  //   path: "/cancel",
  //   icon: <CloseCircleOutlined />,
  // },
  {
    id: 7,
    nameEN: "Logout",
    nameTH: "ออกจากระบบ",
    path: "/logout",
    icon: <PoweroffOutlined />,
  },
];

export const manuEditList = [
  {
    id: 1,
    nameEN: "profile",
    nameTH: "แก้ไขข้อมูลส่วนตัว",
    path: "/profile",
    icon: <UserOutlined />,
  },
  {
    id: 2,
    nameEN: "editpassword",
    nameTH: "แก้ไขรหัสผ่าน",
    path: "/editpassword",
    icon: <KeyOutlined />,
  },
  {
    id: 3,
    nameEN: "booking",
    nameTH: "การเช่ารถของฉัน",
    path: "/booking",
    icon: <CarOutlined />,
  },
  {
    id: 4,
    nameEN: "logout",
    nameTH: "ออกจากระบบ",
    path: "/logout",
    icon: <LoginOutlined />,
  },
];
