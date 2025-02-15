import { useParams } from 'react-router-dom';
import { useAppSelector } from "../../services/types";
import ingredientDetailsStyles from './ingredient-details.module.css';


export default function IngredientDetails() {
    
    const { id } = useParams();
    const ingredients = useAppSelector(state=> state.ingredients.ingredients);
    const ingredient = ingredients.find(ing => (ing._id === id))

    return(
        ingredient ? 
        <div className={ingredientDetailsStyles.main_container}>
            <div className={ingredientDetailsStyles.image}>
                <img src={ingredient.image}/>
            </div>
            <div className={ingredientDetailsStyles.ingredient_detail}>
                <p className="text text_type_main-medium">{ingredient.name}</p>
                <div className={ingredientDetailsStyles.nutritition_values}>
                    <div className={ingredientDetailsStyles.nutritition_value}>    
                        <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                        <p className="text text_type_main-default text_color_inactive">{ingredient.calories}</p>
                    </div>
                    <div className={ingredientDetailsStyles.nutritition_value}>    
                        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <p className="text text_type_main-default text_color_inactive">{ingredient.proteins}</p>
                    </div>
                    <div className={ingredientDetailsStyles.nutritition_value}>    
                        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                        <p className="text text_type_main-default text_color_inactive">{ingredient.fat}</p>
                    </div>
                    <div className={ingredientDetailsStyles.nutritition_value}>    
                        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_main-default text_color_inactive">{ingredient.carbohydrates}</p>
                    </div>
                </div>
            </div>    
        </div> : null    
    )
}
