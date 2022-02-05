import React from "react";
import './FooterClient.scss';

const FooterClient = () => {
    return (
        <div className="footer-dark">
        <footer>
            <div className="container">
                <div className="row">
                        <div className="col-md-6 item text">
                        <div className="mb-2 carlogo"></div>
                        <h3>Car easy life Co.,Ltd</h3>
                            <p>1123-45 street Office Complex,</p>
                            <p>Ratchadapisek road, Khlong Toei, Bangkok 02-123-4567</p>
                    </div>
                    <div className="col-sm-6 col-md-3 item">
                        <h3>เกี่ยวกับ Car easy life</h3>
                        <ul>
                            <li><a href="#">ประเภทรถเช่า</a></li>
                            <li><a href="#">ติดต่อเรา</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-6 col-md-3 item">
                        <h3>ความช่วยเหลือ</h3>
                        <ul>
                            <li><a href="#">วิธีการจอง</a></li>
                            <li><a href="#">เอกสารเช่ารถ</a></li>
                        </ul>
                    </div>
                    <div className="col item social"><a href="#"><i className="icon ion-social-facebook"></i></a><a href="#"><i className="icon ion-social-twitter"></i></a><a href="#"><i className="icon ion-social-snapchat"></i></a><a href="#"><i className="icon ion-social-instagram"></i></a></div>
                </div>
                <p className="copyright">Car easy life © 2021</p>
            </div>
        </footer>
    </div>
    );
};

export default FooterClient;