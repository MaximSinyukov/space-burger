import universalFormStyle from './universal-form.module.css';

import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function UniversalForm({ inputsData, linksData, textData, submitHandler = null, resetHandler = null, children }) {
  const inputComponentsByType = {
    email: EmailInput,
    password: PasswordInput,
    default: Input,
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    submitHandler();
  };

  const handleReset = (evt) => {
    evt.preventDefault();
    resetHandler();
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
            const InputComponent = inputComponentsByType[input.type];

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
};

UniversalForm.propTypes = {
  inputsData: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    props: PropTypes.object
  })).isRequired,
  linksData: PropTypes.arrayOf(PropTypes.shape({
    baseText: PropTypes.string,
    linkText: PropTypes.string,
    route: PropTypes.string
  })),
  textData: PropTypes.shape({
    title: PropTypes.string,
    btn: PropTypes.string
  }),
  submitHandler: PropTypes.func.isRequired,
  resetHandler: PropTypes.func,
  children: PropTypes.node,
};

export default UniversalForm;
