import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-details.module.css';

export const IngredientDetails = () => {
  const { ingredientId } = useParams();
  const { ingredients } = useSelector(store => store.content);
  const activeIngredient = ingredients.find(i => i._id === ingredientId);
  const history = useHistory();

  if (!activeIngredient) return (
    <div className={styles.notFound}>
      <span className="text text_type_main-large p-10">Заказ не найден</span>
      <Button 
        type="secondary" 
        size="large" 
        onClick={() => history.goBack()}>
          Вернуться 
        </Button>
    </div>
)

  const {
    name, proteins, fat, carbohydrates, calories, image_large, description = 'описание ингредиента, которого пока что еще нет'
  } = activeIngredient;

  const nutrients = [
    {
      id: 'calories',
      name: 'Калории, ккал',
      value: calories || 'n/a',
    },
    {
      id: 'proteins',
      name: 'Белки, г',
      value: proteins || 'n/a',
    },
    {
      id: 'fat',
      name: 'Жиры, г',
      value: fat || 'n/a',
    },
    {
      id: 'carbohydrates',
      name: 'Углеводы, г',
      value: carbohydrates || 'n/a',
    },
  ]

  return (
    <div className={styles.wrap}>
      <img src={image_large} alt={name} className={`mb-2`}/>
      <h4 className={`${styles.title} mb-4 text text_type_main-medium`}>{name}</h4>
      <span className={`${styles.description} mb-4 text text_type_main-small`}>{description}</span>
      <div className={`${styles.nutrients} pt-3`}> 
        {nutrients.map(nutrient => (
          <div key={nutrient.id} className={styles.nutrient}>
            <span className="text text_type_main-small">{nutrient.name}</span>
            <span className="text text_type_digits-default">{nutrient.value}</span>
          </div>
        ))}
      </div>
  </div>
  )
}
