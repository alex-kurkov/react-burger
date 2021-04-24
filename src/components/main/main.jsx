import React from "react";
import PropTypes from 'prop-types';
import styles from './main.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients'
import BurgerConstructor from '../../components/burger-constructor/burger-constructor'

export default function Main(props) {
  return (
    <main className={styles.main}>
      <BurgerIngredients data={props.data} />
      <BurgerConstructor items={props.data} />
    </main>
  )
}