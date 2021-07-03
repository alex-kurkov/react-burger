import { FC } from 'react';
import { ProfileMenu } from '../components/profile-menu/index';
import { ProfileEdit } from '../components/profile-edit';
import styles from './profile-edit-page.module.css';

export const ProfileEditPage: FC = () => (
  <main className={styles.main}>
    <ProfileMenu />
    <ProfileEdit />
  </main>
);
