import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import IngredientCard from './ingredient-card';
import styles from './ingredients-sublist.module.css';

const IngredientsSublist = ({ type, name }) => {
  const { ingredients } = useSelector(store => store);
  const ingredientsSublist = ingredients.filter(i => i.type === type)

  return (
    <>
      <h3 className="text text_type_main-medium" id={type}>{name}</h3>
      <ul className={`${styles.list} pr-2 pl-2`}>
        { ingredientsSublist &&
          ingredientsSublist.map((item) => (
            <li className={styles.listItem} key={item._id}>
              <IngredientCard item={item} />
            </li>
          ))
        }
      </ul>
    </>
  )
}

IngredientsSublist.propTypes = {
  type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
  name: PropTypes.string
}

export default IngredientsSublist;
