import { FormEvent, useState } from "react";
import styles from "../../styles/forms/Authentication.module.css";
import { PrimaryButton } from "../UI/Button";
import Spinner from "../UI/Spinner";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import {
  ADD_TO_CART,
  USER_LOGIN,
} from "../../apollo/graphql/mutations/userMutation";
import { setAuth } from "../../store/auth/authSlice";
import syncLocalCart from "../../utils/syncLocalCart";

const Login = () => {
  const [error, setError] = useState("");
  const [login, { loading, error: authError }] = useMutation(USER_LOGIN);
  const [addToCart] = useMutation(ADD_TO_CART);
  const dispatch = useDispatch();

  if (authError) {
    setError(authError.message);
  }

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const { data: authResponse } = await login({
      variables: { email, password },
    });
    if (authResponse && !authError) {
      dispatch(setAuth(authResponse.login));
      await syncLocalCart(addToCart, dispatch);
    }
  };

  return (
    <form onSubmit={handleLogin} className={styles.form}>
      <h2>Login</h2>
      <div className={styles.form_group}>
        <input type="email" name="email" placeholder="Email" />
      </div>
      <div className={styles.form_group}>
        <input type="password" name="password" placeholder="Password" />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <PrimaryButton disabled={loading}>
        {loading ? (
          <Spinner size="15px" color="#fff" borderThickness="2px" />
        ) : (
          "Login"
        )}
      </PrimaryButton>
    </form>
  );
};

export default Login;
