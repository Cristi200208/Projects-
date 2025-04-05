import { IFlats } from "../../types/flats";
import axios from "axios";

export const addFlats = async (data: IFlats) => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.post("http://localhost:3000/flats/add", data, {
      headers: {
        Authorization: `${token}`,
      },
    });

    if (response.status === 201) {
      alert("Flatt Added Successfuly");
    } else {
      alert("Failed to add flat");
    }
  } catch (error) {
    console.log("Error adding flat:", error);
    alert("An error occured while addding the flat");
  }
};

export const getFlatsById = async (id: string) => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.get(`http://localhost:3000/flats/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    if (response.status === 201 && response.data.flat) {
      return response.data.flat;
    }
    console.error("Flat not found");
    return null;
  } catch (error) {
    console.error("Errot fetching Flat :", (error as Error).message);
    return null;
  }
};

export const getAllFlats = async () => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.get("http://localhost:3000/flats", {
      headers: {
        Authorization: `${token}`,
      },
    });

    return response.data.flats || [];
  } catch (error) {
    console.error("Error fetching flats from backend", error);
    return [];
  }
};

export const updateFlatsData = async (flatId: string, updateData: IFlats) => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.post(
      `http://localhost:3000/flats/${flatId}`,
      updateData,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log("Flat updated succesfuly", response.status);
    return response;
  } catch (error) {
    console.error("Error updating flat:", error);
    throw error;
  }
};

export const delleteFlat = async (id: string) => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.delete(`http://localhost:3000/flats/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    if (response.status === 200) {
      console.log("Flat deleted successfully");
    }
  } catch (error) {
    console.error(error);
  }
};

export const sendMessageToFlat = async (
  flatId: string,
  messageText: string
): Promise<void> => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.post(
      `http://localhost:3000/flats/${flatId}/messages`,
      { messageText },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    if (response.status === 201) {
      console.log("Message added Sucesfully");
    }
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
