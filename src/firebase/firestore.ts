import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryConstraint,
  writeBatch,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';
import { LoanApplication, Customer, LoanProduct, HeroSlider } from '@/types';

// ===== CUSTOMER OPERATIONS =====

export const createCustomer = async (customerId: string, customerData: Partial<Customer>) => {
  try {
    await setDoc(doc(db, 'customers', customerId), {
      ...customerData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    throw error;
  }
};

export const getCustomer = async (customerId: string) => {
  try {
    const docSnap = await getDoc(doc(db, 'customers', customerId));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Customer;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const updateCustomer = async (customerId: string, updates: Partial<Customer>) => {
  try {
    await updateDoc(doc(db, 'customers', customerId), {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    throw error;
  }
};

// ===== LOAN APPLICATION OPERATIONS =====

export const createLoanApplication = async (appData: Partial<LoanApplication>) => {
  try {
    const docRef = doc(collection(db, 'loanApplications'));
    await setDoc(docRef, {
      ...appData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getLoanApplication = async (appId: string) => {
  try {
    const docSnap = await getDoc(doc(db, 'loanApplications', appId));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as LoanApplication;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const updateLoanApplication = async (
  appId: string,
  updates: Partial<LoanApplication>
) => {
  try {
    await updateDoc(doc(db, 'loanApplications', appId), {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    throw error;
  }
};

export const getCustomerApplications = async (
  customerId: string,
  constraints: QueryConstraint[] = []
) => {
  try {
    const q = query(
      collection(db, 'loanApplications'),
      where('customerId', '==', customerId),
      ...constraints
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as LoanApplication
    );
  } catch (error) {
    throw error;
  }
};

// ===== LOAN PRODUCTS =====

export const getLoanProducts = async () => {
  try {
    const q = query(
      collection(db, 'loanProducts'),
      orderBy('name')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as LoanProduct
    );
  } catch (error) {
    throw error;
  }
};

export const getLoanProduct = async (productId: string) => {
  try {
    const docSnap = await getDoc(doc(db, 'loanProducts', productId));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as LoanProduct;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const createOrUpdateLoanProduct = async (
  productId: string,
  productData: Partial<LoanProduct>
) => {
  try {
    await setDoc(doc(db, 'loanProducts', productId), productData, { merge: true });
  } catch (error) {
    throw error;
  }
};

// ===== HERO SLIDER =====

export const getHeroSliders = async () => {
  try {
    const q = query(
      collection(db, 'heroSliders'),
      where('enabled', '==', true),
      orderBy('order')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as HeroSlider
    );
  } catch (error) {
    throw error;
  }
};

export const createOrUpdateHeroSlider = async (
  sliderId: string,
  sliderData: Partial<HeroSlider>
) => {
  try {
    await setDoc(doc(db, 'heroSliders', sliderId), sliderData, { merge: true });
  } catch (error) {
    throw error;
  }
};

// ===== GENERIC OPERATIONS =====

export const getCollectionData = async (
  collectionName: string,
  constraints: QueryConstraint[] = []
) => {
  try {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

export const setDocumentData = async (
  collectionName: string,
  docId: string,
  data: any
) => {
  try {
    await setDoc(doc(db, collectionName, docId), data, { merge: true });
  } catch (error) {
    throw error;
  }
};
