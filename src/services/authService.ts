import { setLoading, setUser } from '../store/authSlice';
import { AppDispatch } from '../store/AppDispatch';

export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    // Mock implementation of login service
    // Replace with actual API call
    const userData = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "test@example.com" && password === "Password@123") {
          console.log("Logged in successfully");
          resolve({ id: 1, email });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
    dispatch(setUser(userData));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};