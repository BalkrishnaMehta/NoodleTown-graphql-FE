import { PrimaryButton, SecondaryButton } from "../components/UI/Button";
import UpdatePassword from "../components/forms/UpdatePassword";
import Navbar from "../components/UI/Navbar";
import { Link } from "react-router-dom";
import styles from "../styles/pages/Profile.module.css";
import Skeleton from "react-loading-skeleton";
import Spinner from "../components/UI/Spinner";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "../apollo/graphql/queries/userQueries";
import { USER_LOGOUT } from "../apollo/graphql/mutations/userMutation";
import { toast } from "react-toastify";
import { clearAuth } from "../store/auth/authSlice";
import { useDispatch } from "react-redux";

export interface User {
  id: string;
  name: string;
  email: string;
}

export default function Profile() {
  const [mutate, { loading: isPending, error: logoutError }] = useMutation<{
    logout: { message: string };
  }>(USER_LOGOUT);
  const { loading, error, data } = useQuery<{
    getUserById: User;
  }>(GET_USER);

  const dispatch = useDispatch();

  const user: User = data?.getUserById!;

  const logout = async () => {
    const { data } = await mutate();
    if (data && !logoutError) {
      toast.success(data.logout.message);
      dispatch(clearAuth());
    }
  };

  return (
    <div>
      <Navbar />
      <div className="detailpage-container p-2">
        <div className={styles.profileGrid}>
          <div className={styles.profileInfoCard}>
            {loading ? (
              <>
                <div>
                  <p>
                    <Skeleton circle className={styles.profileAvatar} />
                  </p>
                </div>
                <div className={styles.profileDetails}>
                  <h2>
                    <Skeleton count={2} height={30} />
                  </h2>
                  <p>
                    <Skeleton width={"100%"} />
                  </p>
                  <div>
                    <Skeleton count={2} height={28} width={"100%"} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.profileAvatar}>
                  <span>{user ? user.name[0].toUpperCase() : ""}</span>
                </div>
                <div className={styles.profileDetails}>
                  <h2>{user ? user.name : ""}</h2>
                  <p>{user ? user.email : ""}</p>
                  <div className="col gap-1">
                    <SecondaryButton
                      classes="w-100"
                      disabled={isPending || error !== undefined}
                      onClick={logout}>
                      {isPending ? (
                        <Spinner
                          size="15px"
                          color="#000000"
                          borderThickness="2px"
                        />
                      ) : (
                        "Logout"
                      )}
                    </SecondaryButton>
                    <Link to="/orders">
                      <PrimaryButton
                        classes="w-100"
                        disabled={error !== undefined}>
                        View Orders
                      </PrimaryButton>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className={styles.updatePasswordSection}>
            <UpdatePassword />
          </div>
        </div>
      </div>
    </div>
  );
}
