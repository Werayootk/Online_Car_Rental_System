### Client Frontend Todo list

- [x] Draft All UI
- [ ] After Done Backend Implement Auth (PrivateRoute, JWT, Social Login)
- [ ] Create Page for [SUCCESS, FAIL, 404, Loading]
- [ ] /main 
    - 1. Validate input 
    - 2. Dropdown location data from backend 
    - 3. submit form with require login(redirect login)
- [ ] /search-car?booking_begin=2022-02-17%2010%3A00&booking_end=2022-02-19%2010%3A00
    - 1. Remove Qty rental
    - 2. fetch display only car status=avaliable
    - 3. fetch display only 4 card and show more when scroll down and show ไม่พบรถที่ว่างแล้ว 
    - 4. Implement filter and clear filter
    - 5. add qty days in card price
- [ ] /search-car-detail?car_id=&location_id=&pickup_datetime=2022-02-17%2010:00&return_datetime=2022-02-19%2010:00
    - 1. add show location pickup and return
    - 2. Change datetime must be re calculate price
    - 3. cal qty days and ค่ารับ ส่งรถ
- [ ] /search-car-book?car_id=&location_id=&user_id=&pickup_datetime=2022-02-17%2010:00&return_datetime=2022-02-19%2010:00
    - 1. keep data from cache login show placeholder input form
    - 2. use formilk and implement validate
    - 3. implement ย้อนกลับ redirect ไป step 2
    - 4. implement booking send data to db and redirect to Omise form payment create booking_id format(userid+locatioid+carid+datetime)
    - 5. add status รอชำระเงิน and then create button for Omise payment
    - 6. after paid send data to db bill_id format (bookingid+datetime) 
    - 7. implement request cancel 
    - 8. if admin approve cancel booking will update car status and refund
- [ ] Define E2E

### Admin Frontend Todo list

- [ ] /dashboard?start_datetime=&end_datetime
    - 
- [ ] Venus
- [ ] Venus

<br />

### SERVER Backend Todo list

- [ ] Create DB and Schema follow ER-diagram
- [ ] Implement Auth service (JWT and Social login)
- [ ] Define Test case
- [ ] Login
```
POST /api/v1/admin/login
```

## Useful link example

```
https://www.drivehub.co/
https://keerati.co/2018/05/20/how-to-omisejs-vue-react/
https://www.youtube.com/playlist?list=PLCT_w0Fqe_z6dY4GOabVP2BcUHuDmMv3q
https://www.youtube.com/playlist?list=PLCT_w0Fqe_z4EEjFiLxKVkEFp-i4U7yk6
https://www.youtube.com/watch?v=LWB1s6P0wgE
https://github.com/codecamp-official-thailand/backend-todo-list-authentication/tree/success
https://github.com/codecamp-official-thailand/exercise-frontend-authentication/tree/success
https://www.youtube.com/playlist?list=PL2pMBsI7XJjN4Xt5Q-y8OrH5a4t30cdZ2
https://github.com/marketplace/actions/deploy-to-heroku
https://morioh.com/p/1af43c8e11a9?f=603c719d1528b00f7934320a&fbclid=IwAR16yX3QN3YKvOepfEsrfLI7BMF1B7at9FAGEra3onKElke4509lfR6rPkg
https://www.youtube.com/watch?v=lwOsI8LtVEQ
https://engineering.thinknet.co.th/%E0%B8%97%E0%B8%B3%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%9A-login-facebook-%E0%B8%87%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%82%E0%B8%B6%E0%B9%89%E0%B8%99%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2-passportjs-express-7c8f7461f719
https://www.loginradius.com/blog/async/facebook-authentication-using-node-and-passport/
https://github.com/Werayootk/jwt-authentication-react
https://javascript.plainenglish.io/implementing-infinite-scroll-in-react-34b112813de7
https://alexanderleon.medium.com/implement-social-authentication-with-react-restful-api-9b44f4714fa
https://aaryanadil.com/react-social-login-tutorial-google-facebook-and-twitter-oauth2
```

## Liberty

```
https://mui.com/
https://ant.design/?theme=dark
https://formik.org/
https://cloudinary.com/
https://www.omise.co/th/omise-js/thailand
https://www.omise.co/th/step-by-step-guide/thailand
https://github.com/apidoc/apidoc
https://sequelize.org/
https://www.npmjs.com/package/sequelize-cli#documentation
https://www.passportjs.org/
https://jwt.io/
https://redux-toolkit.js.org/
```