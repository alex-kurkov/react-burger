import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';

const IngredientDetails = ({ item }) => {
  const {
    name, proteins, fat, carbohydrates, calories, price, image_large, description = 'описание ингредиента, которого пока что еще нет'
  } = item
  
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


IngredientDetails.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    image: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
  }),
}

export default IngredientDetails;