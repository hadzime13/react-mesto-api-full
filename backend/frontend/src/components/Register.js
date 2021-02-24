import React, { useState } from 'react';
import './styles/Form.css';
import Form from './Form';

const Register = ({ handleRegister, handleButtonState }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  React.useEffect(() => {
    handleButtonState('login');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    handleRegister(email, password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <Form
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={handleSubmit}
    >
      <>
        <input
          className="form__input"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={data.value}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          required
        />
        <input
          className="form__input"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={data.password}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          required
        />
      </>
    </Form>
  );
};

export default Register;
