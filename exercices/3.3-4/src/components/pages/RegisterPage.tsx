import { SyntheticEvent, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { MovieContext } from "../../types";
import "../Form.css";

const RegisterPage = () => {
  const { registerUser }: MovieContext = useOutletContext();

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await registerUser({ username, password });
      navigate("/login");
    } catch (err) {
      console.error("RegisterPage::error: ", err);
    }
  };

  const handleUsernameInputChange = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    setUsername(input.value);
  };

  const handlePasswordChange = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    setPassword(input.value);
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          type="text"
          id="username"
          name="username"
          onChange={handleUsernameInputChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          type="password"
          id="password"
          name="password"
          onChange={handlePasswordChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
