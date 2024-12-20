import { SyntheticEvent, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { MovieContext } from "../../types";
import "../Form.css";

const LoginPage = () => {
  const { loginUser, remember, setRemember }: MovieContext = useOutletContext();

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await loginUser({ username, password });
      console.log(username, password);
      navigate("/");
    } catch (err) {
      console.error("LoginPage::error: ", err);
    }
  };

  const handleUsernameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <h1>Log in</h1>
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
        <label htmlFor="checkbox">
          <input type="checkbox" name="checkbox" onClick={() => setRemember(!remember)}/>
          Remember me
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default LoginPage;
