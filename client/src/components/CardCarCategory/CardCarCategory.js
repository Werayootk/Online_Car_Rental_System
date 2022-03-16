import React, { useState, useEffect } from "react";
import "./CardCarCategory.scss";

const CardCarCategory = (props) => {
    const { carCategory, onChange, sendClear } = props;
    const [isActiveCarType1, setActiveCarType1] = useState(false);
    const [isActiveCarType2, setActiveCarType2] = useState(false);
    const [isActiveCarType3, setActiveCarType3] = useState(false);
    const [isActiveCarType4, setActiveCarType4] = useState(false);
    const [isActiveCarType5, setActiveCarType5] = useState(false);
    const [isActiveCarType6, setActiveCarType6] = useState(false);
    const [isActiveCarType7, setActiveCarType7] = useState(false);
    const [isActiveCarType8, setActiveCarType8] = useState(false);
    const [selectCarList, setSelectCarList] = useState([]);

    const selectedCar = (val) => {
        setSelectCarList([
            ...selectCarList,
            val
        ])
    }

    const removeSelectedCar = (val) => {
        setSelectCarList((prevState) =>
        prevState.filter((prevItem) => prevItem !== val)
    );
    }

  const sendSelectCarType = () => {
    onChange(selectCarList);
  };

  const clearSelected = () => {
    setActiveCarType1(false);
    setActiveCarType2(false);
    setActiveCarType3(false);
    setActiveCarType4(false);
    setActiveCarType5(false);
    setActiveCarType6(false);
    setActiveCarType7(false);
    setActiveCarType8(false);
  };

  useEffect(() => {
      clearSelected();
      setSelectCarList([]);
    console.log("Selected Clear");
  }, [sendClear]);

  useEffect(() => {
    sendSelectCarType();
  }, [
    isActiveCarType1,
    isActiveCarType2,
    isActiveCarType3,
    isActiveCarType4,
    isActiveCarType5,
    isActiveCarType6,
    isActiveCarType7,
    isActiveCarType8,
  ]);

  return (
    <>
      <div className="category-button">
        <div
          className={
            !isActiveCarType1
              ? `category-type flex-center flex-column`
              : `category-type flex-center flex-column selected-type`
          }
                  onClick={() => {
                      setActiveCarType1(!isActiveCarType1);
                      !isActiveCarType1 ? selectedCar(carCategory[0].val) : removeSelectedCar(carCategory[0].val);
                  }}
        >
          <img className="img-fluid" src={carCategory[0].path} alt="car type" />
          <p className="text-center">
            <span className="type-title">{carCategory[0].type}</span>
            {carCategory[0].price}
          </p>
        </div>
      </div>
      <div className="category-button">
        <div
          className={
            !isActiveCarType2
              ? `category-type flex-center flex-column`
              : `category-type flex-center flex-column selected-type`
          }
                  onClick={() => {
                      setActiveCarType2(!isActiveCarType2);
                      !isActiveCarType2 ? selectedCar(carCategory[1].val) : removeSelectedCar(carCategory[1].val);
                  }}
        >
          <img className="img-fluid" src={carCategory[1].path} alt="car type" />
          <p className="text-center">
            <span className="type-title">{carCategory[1].type}</span>
            {carCategory[1].price}
          </p>
        </div>
      </div>
      <div className="category-button">
        <div
          className={
            !isActiveCarType3
              ? `category-type flex-center flex-column`
              : `category-type flex-center flex-column selected-type`
          }
                  onClick={() => {
                      setActiveCarType3(!isActiveCarType3);
                      !isActiveCarType3 ? selectedCar(carCategory[2].val) : removeSelectedCar(carCategory[2].val);
                  }}
        >
          <img className="img-fluid" src={carCategory[2].path} alt="car type" />
          <p className="text-center">
            <span className="type-title">{carCategory[2].type}</span>
            {carCategory[2].price}
          </p>
        </div>
      </div>
      <div className="category-button">
        <div
          className={
            !isActiveCarType4
              ? `category-type flex-center flex-column`
              : `category-type flex-center flex-column selected-type`
          }
                  onClick={() => {
                      setActiveCarType4(!isActiveCarType4);
                      !isActiveCarType4 ? selectedCar(carCategory[3].val) : removeSelectedCar(carCategory[3].val);
                  }}
        >
          <img className="img-fluid" src={carCategory[3].path} alt="car type" />
          <p className="text-center">
            <span className="type-title">{carCategory[3].type}</span>
            {carCategory[3].price}
          </p>
        </div>
      </div>
      <div className="category-button">
        <div
          className={
            !isActiveCarType5
              ? `category-type flex-center flex-column`
              : `category-type flex-center flex-column selected-type`
          }
                  onClick={() => {
                      setActiveCarType5(!isActiveCarType5);
                      !isActiveCarType5 ? selectedCar(carCategory[4].val) : removeSelectedCar(carCategory[4].val);
                  }}
        >
          <img className="img-fluid" src={carCategory[4].path} alt="car type" />
          <p className="text-center">
            <span className="type-title">{carCategory[4].type}</span>
            {carCategory[4].price}
          </p>
        </div>
      </div>
      <div className="category-button">
        <div
          className={
            !isActiveCarType6
              ? `category-type flex-center flex-column`
              : `category-type flex-center flex-column selected-type`
          }
                  onClick={() => {
                      setActiveCarType6(!isActiveCarType6);
                      !isActiveCarType6 ? selectedCar(carCategory[5].val) : removeSelectedCar(carCategory[5].val);
                  }}
        >
          <img className="img-fluid" src={carCategory[5].path} alt="car type" />
          <p className="text-center">
            <span className="type-title">{carCategory[5].type}</span>
            {carCategory[5].price}
          </p>
        </div>
      </div>
      <div className="category-button">
        <div
          className={
            !isActiveCarType7
              ? `category-type flex-center flex-column`
              : `category-type flex-center flex-column selected-type`
          }
                  onClick={() => {
                      setActiveCarType7(!isActiveCarType7);
                      !isActiveCarType7 ? selectedCar(carCategory[6].val) : removeSelectedCar(carCategory[6].val);
                  }}
        >
          <img className="img-fluid" src={carCategory[6].path} alt="car type" />
          <p className="text-center">
            <span className="type-title">{carCategory[6].type}</span>
            {carCategory[6].price}
          </p>
        </div>
      </div>
      <div className="category-button">
        <div
          className={
            !isActiveCarType8
              ? `category-type flex-center flex-column`
              : `category-type flex-center flex-column selected-type`
          }
                  onClick={() => {
                      setActiveCarType8(!isActiveCarType8);
                      !isActiveCarType8 ? selectedCar(carCategory[7].val) : removeSelectedCar(carCategory[7].val);
                  }}
        >
          <img className="img-fluid" src={carCategory[7].path} alt="car type" />
          <p className="text-center">
            <span className="type-title">{carCategory[7].type}</span>
            {carCategory[7].price}
          </p>
        </div>
      </div>
    </>
  );
};

export default CardCarCategory;
