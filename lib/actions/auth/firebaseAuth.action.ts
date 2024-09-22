'use server'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { getAuthError, getFirestoreError } from '../errors/apiErrorsHandler';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

// Create Account
export async function createAccount({ email, password }: CreateAccountParams): Promise<Result<string>> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
    return { data: userCredential.user.uid };  // Return success with data
  } catch (error: any) {
    console.error('Create Account Error:', error.code, error.message);
    return { error: getAuthError(error.code) };  // Return error message
  }
}

// Sign In Account
export async function signInAccount({ email, password }: SignInAccountParams): Promise<Result<string>> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user);
    return { data: userCredential.user.uid };  // Return success with data
  } catch (error: any) {
    console.error('Sign In Account Error:', error.code, error.message);
    return { error: getAuthError(error.code) };  // Return error message
  }
}

// Create User in Firestore
export async function createUser({ uid, username, email }: CreateUserParams): Promise<Result<UserData>> {
  const userData = { uid, username, email };
  try {
    await addDoc(collection(db, 'users'), {
      uid: userData.uid,
      username: userData.username,
      email: userData.email
    });
    console.log(userData);
    return { data: userData };  // Return success with data
  } catch (error: any) {
    console.error('Create User Error:', error.code, error.message);
    return { error: getFirestoreError(error.code) };  // Return error message
  }
}

// Get User by UID
export async function getUserByUID({ uid }: GetUserByUIDParams): Promise<Result<UserData | null>> {
  const usersRef = collection(db, "users");
  try {
    const q = query(usersRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data() as UserData;
      console.log(userData);
      return { data: userData };  // Return success with data
    } else {
      return { data: null };  // Return null if no user found
    }
  } catch (error: any) {
    console.error('Get User By UID Error:', error.code, error.message);
    return { error: getFirestoreError(error.code) };  // Return error message
  }
}
