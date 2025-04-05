import { Users } from "../../types/users";
import axios from "axios";

export const registerUser = async (data: Users) => {
  try {
    const userDetails = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
    };
    const response = await axios.post(
      "http://localhost:3000/auth/register",
      userDetails
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log("axios error ", error.response);
      const errorMessage =
        error.response?.data?.messages ||
        "An error ocured during registration !";

      throw new Error(errorMessage);
    } else {
      console.log("general error ", error);
      throw new Error("Unexpected errror occured");
    }
  }
};

export const loginUser = async (data: Partial<Users>) => {
  try {
    if (!data.email || !data.password) {
      throw new Error("Email and password are required");
    }

    const response = await axios.post("http://localhost:3000/auth/login", {
      email: data.email,
      password: data.password,
    });
    console.log("Full data", response);
    console.log("token", response.data);

    const token = response.data;

    if (!token) {
      throw new Error("Authentication failed. Token is missing.");
    }

    localStorage.setItem("authToken", token);

    getUserData(token);

    return token;
  } catch (error) {
    console.log("Login error ", error);
    throw error;
  }
};

export const getUserData = async (token: string) => {
  try {
    console.log("Token being sent:", token);

    const response = await axios.get("http://localhost:3000/users/user", {
      headers: {
        Authorization: `${token}`,
      },
    });

    console.log("User Data", response.data);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error fetching user data:", error.response.data);
      console.error("Status:", error.response.status);
    } else {
      console.error("Error:", error);
    }
    throw error;
  }
};

export const getUserById = async (userID: string) => {
  const token = localStorage.getItem("authToken");

  try {
    console.log("Token being sent:", token);

    const response = await axios.get(`http://localhost:3000/users/${userID}`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    console.log("User Data", response.data);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error fetching user data:", error.response.data);
      console.error("Status:", error.response.status);
    } else {
      console.error("Error:", error);
    }
    throw error;
  }
};

export const getAllUsers = async (): Promise<Users[]> => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.get("http://localhost:3000/users", {
      headers: {
        Authorization: `${token}`,
      },
    });

    return response.data as Users[];
  } catch (error) {
    console.error(
      "Errot fetching user data :",
      error.response?.data || (error as Error).message
    );
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};

export const logoutUser = async () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};

export const UpdateUser = async (user: Users) => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.post(
      `http://localhost:3000/users/${user._id}`,
      user,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return console.error("Error updating user!!!");
    }
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response?.data || (error as Error).message
    );
    throw new Error("Failed to update user.");
  }
};

export const delleteUser = async (user: Users) => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.delete(
      `http://localhost:3000/users/${user._id}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return console.error("Failed to dellete USER");
    }
  } catch (error) {
    console.error(
      "Error delleting user:",
      error.response?.data || (error as Error).message
    );
    throw new Error("Server error");
  }
};
