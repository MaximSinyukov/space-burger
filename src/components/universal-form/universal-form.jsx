import universalFormStyle from './universal-form.module.css';

import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

function UniversalForm({ inputsData, linksData, textData }) {
  const inputComponentsByType = {
    email: EmailInput,
    password: PasswordInput,
    default: Input,
  };

  return (
    <div
    className={`${universalFormStyle['universal-form']}`}>
      <h2
      className={`text text_type_main-medium ${universalFormStyle['universal-form__header']}`}>
        { textData.title }
      </h2>

      <form
      className={`${universalFormStyle['universal-form__form']}`}>
        {
          inputsData.map((input, index) => {
            const InputComponent = inputComponentsByType[input.type];

            return (
              <InputComponent
              key={'input-' + index}
              {...input.props}/>
            );
          })
        }

        <Button
        type="primary"
        size="medium"
        extraClass="mt-6"
        htmlType="button">
          { textData.btn }
        </Button>
      </form>

      {
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
}

export default UniversalForm;
