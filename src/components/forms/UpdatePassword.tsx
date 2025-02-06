import { FormEvent, useState } from "react";
import { PrimaryButton } from "../UI/Button";
import styles from "../../styles/forms/UpdatePassword.module.css";
import Spinner from "../UI/Spinner";
import { UPDATE_PASSWORD } from "../../apollo/graphql/mutations/userMutation";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const [error, setError] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [mutate, { loading: isPending }] = useMutation<{
    updatePassword: { message: string };
  }>(UPDATE_PASSWORD, {
    onError(error) {
      setError(error.message);
    },
    onCompleted(data) {
      toast.success(data.updatePassword.message);
      setCurrentPassword("");
      setNewPassword("");
    },
  });

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setError("");
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!newPassword || !currentPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must be at least 6 characters long, contain at least one uppercase letter, one symbol, and one number."
      );
      return;
    }

    await mutate({
      variables: { currentPassword, newPassword },
    });
  };

  return (
    <div className={styles.updatePasswordContainer}>
      <h2 className={styles.title}>Update Password</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="currentPassword" className={styles.label}>
            Current Password
          </label>
          <input
            id="currentPassword"
            type="password"
            name="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={styles.input}
            placeholder="Enter current password"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="newPassword" className={styles.label}>
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.input}
            placeholder="Enter new password"
          />
        </div>
        <p className={styles.errorMessage}>{error ? error : "\u00A0"}</p>
        <div className={styles.buttonContainer}>
          <PrimaryButton
            type="submit"
            classes={styles.submitButton}
            disabled={isPending}>
            {isPending ? (
              <Spinner size="15px" color="#fff" borderThickness="2px" />
            ) : (
              "Update Password"
            )}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
