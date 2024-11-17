import React from 'react';

import userDataStyle from './user-data.module.css';

import UniversalForm from 'src/components/universal-form/universal-form';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUser } from 'services/actions/userActions';
import { setUserData } from 'services/reducers/user';

import { useAppDispatch, useAppSelector } from 'src/index';
import {
  TUniversalFormData,
} from 'utils/constants/types';

type TUserData = {
  email?: string;
  name?: string;
  password?: string;
};

function UserData() {
  const dispatch = useAppDispatch();

  const userData = useAppSelector((store) => store.user.userData as TUserData);
  const passwordStartValue = '';

  const [disabledNameInput, setDisabledNameInput] = React.useState<boolean>(true);

  const [nameValue, setNameValue] = React.useState<string>('');
  const [nameStartValue, setNameStartValue] = React.useState<string>('');
  const [emailValue, setEmailValue] = React.useState<string>('');
  const [emailStartValue, setEmailStartValue] = React.useState<string>('');
  const [passwordValue, setPasswordValue] = React.useState<string>('');

  const [isEditedForm, setIsEditedForm] = React.useState<boolean>(false);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNameValue(e.target.value);
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmailValue(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPasswordValue(e.target.value);
  };

  React.useEffect(() => {
    setIsEditedForm((nameValue !== nameStartValue)
      || (emailValue !== emailStartValue)
      || (passwordValue !== passwordStartValue));
  }, [nameValue, emailValue, passwordValue, nameStartValue, emailStartValue]);

  React.useEffect(() => {
    if (userData.name || !nameStartValue) {
      setNameValue(userData.name || '');
      setNameStartValue(userData.name || '');
    }

    if (userData.email || !emailStartValue) {
      setEmailValue(userData.email || '');
      setEmailStartValue(userData.email || '');
    }
  }, [userData, nameStartValue, emailStartValue]);

  const handleResetForm = (): void => {
    dispatch(setUserData({
      name: nameStartValue,
      email: emailStartValue,
    }));

    setPasswordValue('');
  };

  const handleUpdateUser = React.useCallback(
    (): void => {
      let newUserData: TUserData = {};

      if (nameValue !== nameStartValue) {
        newUserData = {
          name: nameValue,
        };
      }

      if (emailValue !== emailStartValue) {
        newUserData = {
          ...newUserData,
          email: emailValue,
        };
      }

      if (passwordValue !== passwordStartValue) {
        newUserData = {
          ...newUserData,
          password: passwordValue,
        };
      }

      // @ts-ignore TODO: fix after add types in redux
      dispatch(updateUser(newUserData))
        .catch((err) => {
          console.warn(err, 'Error in updateUser method');
        });
    },
    [dispatch, emailStartValue, emailValue, nameStartValue, nameValue, passwordValue]
  );


  const formData: TUniversalFormData = {
    submitHandler: handleUpdateUser,
    resetHandler:  handleResetForm,
    inputsData: [
      {
        type: 'default',
        props: {
          value: nameValue,
          onChange: onNameChange,
          placeholder: 'Имя',
          icon: 'EditIcon',
          extraClass: 'mb-6',
          disabled: disabledNameInput,
          onIconClick: () => {
            setDisabledNameInput(false);
          },
          onBlur: () => {
            setDisabledNameInput(true);
          },
        },
      },
      {
        type: 'email',
        props: {
          value: emailValue,
          onChange: onEmailChange,
          placeholder: 'Логин',
          isIcon: true,
          extraClass: 'mb-6',
        },
      },
      {
        type: 'password',
        props: {
          value: passwordValue,
          onChange: onPasswordChange,
          placeholder: 'Пароль',
          icon: 'EditIcon',
        },
      },
    ],
  };

  return (
    <div
    className={`${userDataStyle['user-data']}`}>
      {
        formData &&
          <UniversalForm
          { ...formData }>
            {
              Boolean(isEditedForm) && (
                <div
                className={`mt-6 ${userDataStyle['user-data__controls']}`}>
                  <Button
                  htmlType="reset"
                  type="secondary"
                  size="medium">
                    Отмена
                  </Button>

                  <Button
                  htmlType="submit"
                  type="primary"
                  size="medium">
                    Сохранить
                  </Button>
                </div>
              )
            }
          </UniversalForm>
      }
    </div>
  );
}

export default UserData;
