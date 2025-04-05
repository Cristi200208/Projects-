import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { Users } from "../../types/users";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

export const registerUser = async (data: Users) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    await setDoc(doc(db, "users", userCredentials.user.uid), {
      uid: userCredentials.user.uid,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      age: Number(data.age),
      flatsAdded: [],
      favorite: [],
      messages: [],
      role: "regular",
    });
    alert("user registered");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginUser = async (data: Partial<Users>) => {
  try {
    const userDetails = await signInWithEmailAndPassword(
      auth,
      data.email as string,
      data.password as string
    );
    return getUserData(userDetails.user.uid);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserData = async (userId: string) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      localStorage.setItem(
        "loggedUser",
        JSON.stringify(docSnap.data().uid as string)
      );
      return docSnap.data();
    } else {
      console.log("no such a document");
      return null;
    }
  } catch (error) {
    console.error("Errot fetching user data :", error);
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return users;
  } catch (error) {
    console.error("Errot fetching user data :", error);
    return null;
  }
};

export const logoutUser = async () => {
  await signOut(auth);
  localStorage.removeItem("loggedUser");
};

export const UpdateUser = async (user: Users) => {
  await setDoc(doc(db, "users", user.uid), {
    ...user,
  });
};

export const delleteUser = async (user: Users) => {
  await deleteDoc(doc(db, "users", user.uid));
};
