import {
    AppstoreOutlined,
    TeamOutlined,
    ProfileOutlined,
    CarOutlined,
    CloseCircleOutlined,
    PoweroffOutlined
} from '@ant-design/icons';
  
export const MenuList = [
    {
      id: 1,
      nameEN: 'Dashboard',
      nameTH: 'หน้ารวมสรุปผล',
      path: '/dashboard',
      icon: <AppstoreOutlined />
    }, {
      id: 2,
      nameEN: 'Customer',
      nameTH: 'รายชื่อลูกค้า',
      path: '/customer',
      icon: <TeamOutlined />
    }, {
      id: 3,
      nameEN: 'Order',
      nameTH: 'รายการออเดอร์จองรถ',
      path: '/order',
      icon: <ProfileOutlined />
    },
    {
      id: 4,
      nameEN: 'Management cars',
      nameTH: 'จัดการข้อมูลรถเช่า',
      path: '/management',
      icon: <CarOutlined />
    }, {
      id: 5,
      nameEN: 'Cancel order',
      nameTH: 'รายการยกเลิกการจอง',
      path: '/cancel',
      icon: <CloseCircleOutlined />
    }, {
      id: 6,
      nameEN: 'Logout',
      nameTH: 'ออกจากระบบ',
      path: '/logout',
      icon: <PoweroffOutlined />
    }];