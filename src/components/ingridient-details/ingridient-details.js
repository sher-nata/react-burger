import React from 'react';
import PropTypes from 'prop-types';
import ingridientDetailsStyles from './ingridient-details.module.css';


export default function IngridientDetails({ingridient}) {
    return(
        <div className={ingridientDetailsStyles.main_container}>
            <div className={ingridientDetailsStyles.image}>
                <img src={ingridient.image}/>
            </div>
            <div className={ingridientDetailsStyles.ingridient_detail}>
                <p className="text text_type_main-medium">{ingridient.name}</p>
                <div className={ingridientDetailsStyles.nutritition_values}>
                    <div className={ingridientDetailsStyles.nutritition_value}>    
                        <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                        <p className="text text_type_main-default text_color_inactive">{ingridient.calories}</p>
                    </div>
                    <div className={ingridientDetailsStyles.nutritition_value}>    
                        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <p className="text text_type_main-default text_color_inactive">{ingridient.proteins}</p>
                    </div>
                    <div className={ingridientDetailsStyles.nutritition_value}>    
                        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                        <p className="text text_type_main-default text_color_inactive">{ingridient.fat}</p>
                    </div>
                    <div className={ingridientDetailsStyles.nutritition_value}>    
                        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_main-default text_color_inactive">{ingridient.carbohydrates}</p>
                    </div>
                </div>
            </div>    
        </div>      
    )
}

IngridientDetails.propTypes = {
    ingridient: PropTypes.shape({
        _id:  PropTypes.string,
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,   
        price: PropTypes.number,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
    }).isRequired
  } ; 