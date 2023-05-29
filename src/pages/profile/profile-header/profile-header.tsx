import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { BASE_URL } from '../../../api';
import imgFile from '../../../assets/images/avatar.png';
import { DataTestId } from '../../../enums';
import { useAppDispatch } from '../../../store/hooks';
import { uploadAvatarRequest } from '../../../store/slices';

import styles from './profile-header.module.scss';

type ProfileHeaderProps = {
  id: number;
  userFirstName: string;
  userLastName: string;
  avatar: string;
}

type FileUploadType = {
  picture: any;
};

export const ProfileHeader = ({ userFirstName, userLastName, id, avatar }: ProfileHeaderProps) => {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<string | undefined>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FileUploadType>();

  const convert = (file: File) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result?.toString());
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: FileUploadType) => {
    const formData = new FormData();

    formData.append('files', data.picture[0]);

    dispatch(uploadAvatarRequest({ id, formData }));

    if (data.picture.length > 0) convert(data.picture[0]);
  };
  
  return (
    <div className={styles.wrapper} data-test-id={DataTestId.profileAvatar}>
      <form className={styles.avatarMask} onChange={handleSubmit(onSubmit)}>
        <input id='upload' className={styles.fileUpload} type='file' {...register('picture')} />
        <label htmlFor='upload'>
          <div className={styles.mask} />
        </label>
        <img
          className={styles.avatar}
          src={avatar ? `${avatar}` : imgFile}
          alt='profile-avatar'
        />
      </form>
      <div className={styles.profileName}>
        <span>{userLastName}</span>
        <span>{userFirstName}</span>
      </div>
    </div>
  );
};
