import styles from './profile-edit-page.module.css';
import { ProfileMenu } from '../components/profile-menu';
import { ProfileEdit } from '../components/profile-edit';

export const ProfileEditPage = () => (
  <main className={styles.main}>
    <ProfileMenu />
    <ProfileEdit />
  </main>
);
