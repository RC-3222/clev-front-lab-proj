import { Container } from '../../components/common/container';
import { DataTestId } from '../../enums';
import { useAppSelector } from '../../store/hooks';
import { userSelector } from '../../store/slices';

import { ProfileActions } from './profile-actions';
import { ProfileHeader } from './profile-header';
import { ProfileUserForm } from './profile-user-form';

import styles from './profile-page.module.scss';

export const ProfilePage = () => {
  const { data: user } = useAppSelector(userSelector);

  return (
    <Container>
      <div className={styles.wrapper} data-test-id={DataTestId.profilePage}>
        <ProfileHeader
          avatar={user.avatar}
          id={user.id}
          userFirstName={user?.firstName}
          userLastName={user?.lastName}
        />

        <ProfileUserForm user={user} />
        <ProfileActions user={user} />
      </div>
    </Container>
  );
};
