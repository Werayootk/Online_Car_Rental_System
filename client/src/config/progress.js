
export const ProgressBooking = [
    {
        id: 1,
        description: 'ผลการค้นหา',
        path: '/search-car'
    },
    {
        id: 2,
        description: 'รายละเอียดรถ',
        path:'/search-car-detail'
    },
    {
        id: 3,
        description: 'ข้อมูลการจอง',
        path:'/search-car-book'
    },
    {
        id: 4,
        description: 'ตรวจสอบข้อมูล',
        path:'/search-car-verify'
    }
];

export const ProgressCarStatus = [
    {
        id: 1,
        status: 'ทำการจอง',
        path:'/booking-car'
    },
    {
        id: 2,
        status: 'รอชำระเงิน',
        path:'/pending-payment'
    },
    {
        id: 3,
        status: 'รอตรวจสอบ',
        path:'/waitng-verify'
    },
    {
        id: 4,
        status: 'รอรับรถ',
        path: '/receive-car'
    },
    {
        id: 5,
        status: 'คืนรถ',
        path: '/return-car'
    }
];