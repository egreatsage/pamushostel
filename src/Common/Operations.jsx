
import { db,storage } from "./dbconfig";
import {collection,addDoc,updateDoc, getDocs,getDoc,doc,deleteDoc} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, } from "firebase/storage";
import { updateProfile } from "firebase/auth";
const usersCollectionRef = collection(db, "Users");
const bookingCollectionRef = collection(db, "Bookings");
const messagesCollectionRef = collection(db, "Messages")
const staffCollectionRef = collection(db, "Staff")
const noticesCollectionRef = collection(db, 'Notices')
const occupantsCollectionRef = collection(db, 'Occupants')
const rulesCollectionRef = collection(db, 'rules')
const occupantCollectionRef = collection(db, 'Occupants')
const remindersCollectionRef = collection(db, 'Reminders')
const roomTypeCollectionRef = collection(db, 'RoomTypes')
const roomsCollectionRef = collection(db, 'Rooms')
const studentmessagesCollectionRef = collection(db, 'StudentsMessages')

class dbdataservice {
  //Bookings
  addBooking = (newBooking) => {
    return addDoc(bookingCollectionRef, newBooking);
  };

  //
  addRoomType = (newRoomType) => {
    return addDoc(roomTypeCollectionRef, newRoomType);
  };
  addRoom = (newRoom) => {
    return addDoc(roomsCollectionRef, newRoom);
  };
  //Messages
  addMessage = (newMessage) => {
    return addDoc(messagesCollectionRef, newMessage);
  }
  addStudentMessage = (newStudentMessage) => {
    return addDoc(studentmessagesCollectionRef, newStudentMessage);
  }
  //Reminders
  addReminder = (newReminder) => {
    return addDoc(remindersCollectionRef, newReminder);
  }
  //Staff
  addStaff = (newStaff) => {
    return addDoc(staffCollectionRef, newStaff);
  }
  //Staff
  addOccupant = (newOccupant) => {
    return addDoc(occupantCollectionRef, newOccupant);
  }
  addNotice = (newNotice) => {
    return addDoc(noticesCollectionRef, newNotice);
  }
   //Messages
   addUser = (newUser) => {
    return addDoc(usersCollectionRef, newUser);
  }
  deleteBooking = (id) => {
    const bookingDoc = doc(db, "Bookings", id);
    return deleteDoc(bookingDoc);
  };
  updateStaff = (id, updatedStaff) => {
    const staffDoc = doc(db, "Staff", id);
    return updateDoc(staffDoc, updatedStaff);
  };
  updateRoomType = (id, updatedRoomType) => {
    const roomTypeDoc = doc(db, "RoomTypes", id);
    return updateDoc(roomTypeDoc, updatedRoomType);
  };
  updateBooking = (id, updatedBooking) => {
    const bookingDoc = doc(db, "Bookings", id);
    return updateDoc(bookingDoc, updatedBooking);
  };
  updateRoom = (id, updatedRoom) => {
    const roomDoc = doc(db, "Rooms", id);
    return updateDoc(roomDoc, updatedRoom);
  };

  updateOccupant = (id, updatedOccupant) => {
    const occupantDoc = doc(db, "Occupants", id);
    return updateDoc(occupantDoc, updatedOccupant);
  };
  deleteStaff = (id) => {
    const staffDoc = doc(db, "Staff", id);
    return deleteDoc(staffDoc);
  };

  deleteOccupant = (id) => {
    const occupantsDoc = doc(db, "Occupants", id);
    return deleteDoc(occupantsDoc);
  };
  deleteUsers = (id) => {
    const usersDoc = doc(db, "Users", id);
    return deleteDoc(usersDoc);
  };
  deleteMessage = (id) => {
    const messagesDoc = doc(db, "Messages", id);
    return deleteDoc(messagesDoc);
  };
  deleteNotice = (id) => {
    const noticesDoc = doc(db, "Notices", id);
    return deleteDoc(noticesDoc);
  };
  getAllBookings = () => {
    return getDocs(bookingCollectionRef);
  }
  getAllStaff = () => {
    return getDocs(staffCollectionRef);
  };
  getAllNotices = () => {
    return getDocs(noticesCollectionRef);
  };
  getAllMessages = () => {
    return getDocs(messagesCollectionRef);
  };
  getAllRules = () => {
    return getDocs(rulesCollectionRef);
  };
  getAllUsers = () => {
    return getDocs(usersCollectionRef);
  };
  getAllReminders = () =>{
    return getDocs(remindersCollectionRef)
  }
  getAllRoomTypes = () =>{
    return getDocs(roomTypeCollectionRef)
  }
  getAllOccupants = () => {
    return getDocs(occupantsCollectionRef);
  };
  getAllRooms = () => {
    return getDocs(roomsCollectionRef);
  };
  getNotice = (id) => {
    const noticeDoc = doc(db, "Notices", id);
    return getDoc(noticeDoc);
  };
  getBooking = (id) => {
    const bookingDoc = doc(db, "Bookings", id);
    return getDoc(bookingDoc);
  };
  getRoom = (id) => {
    const roomDoc = doc(db, "Rooms", id);
    return getDoc(roomDoc);
  };
  getRoomType = (id) => {
    const roomTypeDoc = doc(db, "RoomTypes", id);
    return getDoc(roomTypeDoc);
  };
  getStaff = (id) => {
    const staffDoc = doc(db, "Staff", id);
    return getDoc(staffDoc);
  };
  getUsers = (id) => {
    const usersDoc = doc(db, "Users", id);
    return getDoc(usersDoc);
  };
  getOccupant = (id) => {
    const occupantDoc = doc(db, "Occupants", id);
    return getDoc(occupantDoc);
  };
}
// eslint-disable-next-line
export default new dbdataservice();

export async function upload(file,user,setLoading){
  const fileRef = ref(storage,user.uid )
   setLoading(true);
   // eslint-disable-next-line 
  const snapshot = await uploadBytes(fileRef,file)
  const photoURL = await getDownloadURL(fileRef)
  updateProfile(user,{photoURL})
  setLoading(false);
  alert('uploaded successfully')
}