import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import userDataStyle from './user-data.module.css';

import UniversalForm from 'components/universal-form/universal-form';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser, updateUser } from 'services/actions/userActions';
import { setUserData } from 'services/reducers/user';

function UserData() {
  const dispatch = useDispatch();

  const userData = useSelector(store => store.user.userData);
  const passwordStartValue = '';

  const [disabledNameInput, setDisabledNameInput] = React.useState(true);

  const [nameValue, setNameValue] = React.useState('');
  const [nameStartValue, setNameStartValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [emailStartValue, setEmailStartValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  const [isEditedForm, setIsEditedForm] = React.useState(false);

  const onNameChange = e => {
    setNameValue(e.target.value);
  };

  const onEmailChange = e => {
    setEmailValue(e.target.value);
  };

  const onPasswordChange = e => {
    setPasswordValue(e.target.value);
  };

  React.useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  React.useEffect(() => {
    setIsEditedForm((nameValue !== nameStartValue)
      || (emailValue !== emailStartValue)
      || (passwordValue !== passwordStartValue));
  }, [nameValue, emailValue, passwordValue, nameStartValue, emailStartValue]);

  React.useEffect(() => {
    if (userData.name) {
      setNameValue(userData.name);
      setNameStartValue(userData.name);
    }

    if (userData.email) {
      setEmailValue(userData.email);
      setEmailStartValue(userData.email);
    }
  }, [userData]);

  const handleResetForm = () => {
    dispatch(setUserData({
      name: nameStartValue,
      email: emailStartValue,
    }));

    setPasswordValue('');
  };

  const handleUpdateUser = React.useCallback(
    () => {
      let newUserData;

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

      dispatch(updateUser(newUserData))
        .catch((err) => {
          console.warn(err, 'Error in updateUser method');
        });
    },
    [dispatch, emailStartValue, emailValue, nameStartValue, nameValue, passwordValue]
  );


  const formData = {
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
