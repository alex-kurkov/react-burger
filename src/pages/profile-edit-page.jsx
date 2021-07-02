import styles from './profile-edit-page.module.css';
import { ProfileMenu } from '../components/profile-menu/index';
import { ProfileEdit } from '../components/profile-edit';


export const ProfileEditPage = () => (
  <main className={styles.main}>
    <ProfileMenu />
    <ProfileEdit />
  </main>
);
