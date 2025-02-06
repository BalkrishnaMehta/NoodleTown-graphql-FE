import { FormEvent, useState } from "react";
import styles from "../../styles/forms/Authentication.module.css";
import { PrimaryButton } from "../UI/Button";
import Spinner from "../UI/Spinner";
import { useMutation } from "@apollo/client";
import {
  ADD_TO_CART,
  ADD_USER,
} from "../../apollo/graphql/mutations/userMutation";
import { setAuth } from "../../store/auth/authSlice";
import { useDispatch } from "react-redux";
import syncLocalCart from "../../utils/syncLocalCart";

const SignUp = () => {
  const [error, setError] = useState("");
  const nameRegex = /^[a-zA-Z\s]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

  const [register, { loading, error: authError }] = useMutation(ADD_USER);
  const [addToCart] = useMutation(ADD_TO_CART);
  const dispatch = useDispatch();

  if (authError) {
    setError(authError.message);
  }

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!nameRegex.test(name)) {
      setError(
        "Name must be at least 3 characters long and contain only letters and spaces."
      );
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters long, contain at least one uppercase letter, one symbol, and one number."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { data: authResponse } = await register({
      variables: {
        name,
        email,
        password,
      },
    });
    if (authResponse && !authError) {
      dispatch(setAuth(authResponse.register));
      await syncLocalCart(addToCart, dispatch);
    }
  };

  return (
    <form onSubmit={handleSignUp} className={styles.form}>
      <h2>Sign Up</h2>
      <div className={styles.form_group}>
        <input type="text" name="name" placeholder="Full Name" />
      </div>
      <div className={styles.form_group}>
        <input type="email" name="email" placeholder="Email" />
      </div>
      <div className={styles.form_group}>
        <input type="password" name="password" placeholder="Password" />
      </div>
      <div className={styles.form_group}>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <PrimaryButton disabled={loading}>
        {loading ? (
          <Spinner size="15px" color="#fff" borderThickness="2px" />
        ) : (
          "Sign Up"
        )}
      </PrimaryButton>
    </form>
  );
};

export default SignUp;
