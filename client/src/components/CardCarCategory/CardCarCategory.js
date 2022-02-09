import React from "react";
import './CardCarCategory.scss';


const CardCarCategory = (props) => {
    return (
        props.items.map((v, i) =>
            <div className="category-button" key={v.id}>
                <div className="category-type flex-center flex-column">
                    <img className="img-fluid" src={v.path} alt="car type" />  
                    <p className="text-center">
                        <span className="type-title">{v.type}</span>
                        {v.price}
                    </p>
                </div>
            </div>
        )
    );
};

export default CardCarCategory;