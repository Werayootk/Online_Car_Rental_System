import React from "react";
import './CardCarCategory.scss';


const CardCarCategory = (props) => {
    return (
        props.carCategory.map((v, i) => <div>{v.type}</div>)
    );
};

export default CardCarCategory;