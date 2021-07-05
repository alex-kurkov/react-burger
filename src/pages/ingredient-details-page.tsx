import { FC } from 'react';
import { IngredientDetails } from '../components/ingredient-details';
import styles from './ingredient-details.module.css';

export const IngredientDetailsPage: FC = () => (
  <main className={styles.main}>
    <IngredientDetails />
  </main>
);
