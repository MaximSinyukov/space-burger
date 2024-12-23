import universalFormStyle from './universal-form.module.css';

import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { FormEvent } from 'react';

import {
  TUniversalFormData,
} from 'utils/constants/types';


type TInputComponents = {
  email: typeof EmailInput;
  password: typeof PasswordInput;
  default: typeof Input;
};

const UniversalForm: React.FC<TUniversalFormData> = ({ inputsData, linksData, textData, submitHandler, resetHandler, children }) => {
  const inputComponentsByType: Readonly<TInputComponents> = {
    email: EmailInput,
    password: PasswordInput,
    default: Input,
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    submitHandler();
  };

  const handleReset = (evt: FormEvent) => {
    evt.preventDefault();

    if (resetHandler) {
      resetHandler();
    }
  };

  return (
    <div
    className={`${universalFormStyle['universal-form']}`}>
      {
        textData?.title &&
          (
            <h2
            className={`mb-6 text text_type_main-medium ${universalFormStyle['universal-form__title']}`}>
              { textData.title }
            </h2>
          )
      }

      <form
      onReset={handleReset}
      onSubmit={handleSubmit}
      className={`${universalFormStyle['universal-form__form']}`}>
        {
          inputsData.map((input, index) => {
            const InputComponent = inputComponentsByType[input.type] as React.FC;

            return (
              <InputComponent
              key={'input-' + index}
              {...input.props}/>
            );
          })
        }

        {
          textData?.btn && !children &&
            (
              <Button
              type="primary"
              size="medium"
              extraClass="mt-6"
              htmlType="submit">
                { textData.btn }
              </Button>
            )
        }

        {children}
      </form>

      {linksData &&
        linksData?.length > 0 &&
          <nav
          className={`mt-20 ${universalFormStyle['universal-form__navigation']}`}>
            {
              linksData.map((link, index) => {
                return (
                  <p
                  key={'input-' + index}
                  className={`mt-4 text text_type_main-default text_color_inactive ${universalFormStyle['universal-form__nav-text']}`}>
                    { link.baseText + ' ' }

                    <Link
                    to={link.route}
                    className={`${universalFormStyle['universal-form__nav-link']}`}>
                      { link.linkText }
                    </Link>
                  </p>
                );
              })
            }
          </nav>
      }
    </div>
  );
};

export default UniversalForm;
