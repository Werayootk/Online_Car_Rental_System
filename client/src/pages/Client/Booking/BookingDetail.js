import React, { useState, useEffect } from "react";
import "./BookingDetail.scss";
import ImageGallery from "react-image-gallery";
import TableCarDetail from "../../../components/TableCarDetail/TableCarDetail";
import { imagesTest, carData } from "../../../mockup/car_data";

const BookingDetail = (props) => {
  const [imgcar, setImgcar] = useState(imagesTest);
  const [carDetail, setCarDetail] = useState(carData[0]);

  return (
    <div className="container merged_container">
      <div className="mt-3 left_container">
        <div className="header_container">
          <div className="header_left">
            <h3>Suzuki Swift 2015</h3>
            <div className="branch_content"></div>
          </div>
          <div className="header_right"></div>
          <div className="gallery_wrapper pb-2">
            <div className="gallery">
              <ImageGallery items={imagesTest} />
            </div>
          </div>
          <div className="table__car_detail">
          <TableCarDetail items={carDetail} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
