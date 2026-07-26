import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  Auth,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from './config';

export const registerWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

export const confirmReset = async (code: string, newPassword: string) => {
  try {
    await confirmPasswordReset(auth, code, newPassword);
  } catch (error) {
    throw error;
  }
};

export const sendSignInLink = async (email: string) => {
  const actionCodeSettings = {
    url: `${window.location.origin}/auth/verify`,
    handleCodeInApp: true,
  };
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
  } catch (error) {
    throw error;
  }
};

export const verifySignInLink = async (email: string, link?: string) => {
  const url = link || window.location.href;
  if (isSignInWithEmailLink(auth, url)) {
    try {
      const userCredential = await signInWithEmailLink(auth, email, url);
      window.localStorage.removeItem('emailForSignIn');
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }
};
