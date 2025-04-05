import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { IFlats } from "../../types/flats";

export const addFlats = async (data: IFlats) => {
  try {
    await setDoc(doc(db, "flats", data.id), data);
    alert("Flat Added!");
  } catch (error) {
    console.log(error);
  }
};

export const getFlat = async (flatId: string) => {
  try {
    const docRef = doc(db, "flats", flatId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    console.error("error fetching flat data ");
    return null;
  }
};

export const getFlats = async (id: string) => {
  try {
    const docRef = doc(db, "flats", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    console.error("Errot fetching user data :", error);
    return null;
  }
};

export const getAllFlats = async () => {
  const flatsArray: IFlats[] = [];
  const querrySnapshot = await getDocs(collection(db, "flats"));
  querrySnapshot.forEach((doc) => {
    flatsArray.push(doc.data() as IFlats);
  });
  return flatsArray;
};

export const updateFlatsData = async (flats: IFlats) => {
  await setDoc(doc(db, "flats", flats.id), {
    ...flats,
  });
};

export const delleteFlat = async (id: string) => {
  await deleteDoc(doc(db, "flats", id));
};
