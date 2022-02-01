import React from "react";
import './Footer.scss';

const Footer = () => {
    return (
        <div class="footer-dark">
        <footer>
            <div class="container">
                <div class="row">
                        <div class="col-md-6 item text">
                        <div className="mb-2 carlogo"></div>
                        <h3>Car easy life Co.,Ltd</h3>
                            <p>1123-45 street Office Complex,</p>
                            <p>Ratchadapisek road, Khlong Toei, Bangkok 02-123-4567</p>
                    </div>
                    <div class="col-sm-6 col-md-3 item">
                        <h3>เกี่ยวกับ Car easy life</h3>
                        <ul>
                            <li><a href="#">ประเภทรถเช่า</a></li>
                            <li><a href="#">ติดต่อเรา</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-6 col-md-3 item">
                        <h3>ความช่วยเหลือ</h3>
                        <ul>
                            <li><a href="#">วิธีการจอง</a></li>
                            <li><a href="#">เอกสารเช่ารถ</a></li>
                        </ul>
                    </div>
                    <div class="col item social"><a href="#"><i class="icon ion-social-facebook"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-snapchat"></i></a><a href="#"><i class="icon ion-social-instagram"></i></a></div>
                </div>
                <p class="copyright">Car easy life © 2021</p>
            </div>
        </footer>
    </div>
    );
};

export default Footer;