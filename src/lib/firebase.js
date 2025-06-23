import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp, doc, updateDoc, getDoc, query, where, getDocs } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase only if credentials are available
if (!firebaseConfig.apiKey) {
  throw new Error('Firebase credentials not found. Please check your environment variables.');
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Check if user exists in waitlist
export const checkWaitlistEmail = async (email) => {
  try {
    const waitlistRef = collection(db, 'waitlist');
    const q = query(waitlistRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    return { exists: !querySnapshot.empty };
  } catch (error) {
    console.error('Error checking waitlist email:', error);
    return { error: error.message };
  }
};

// Save initial waitlist data (Step 1)
export const saveWaitlistStep1 = async (formData) => {
  try {
    // Check if email already exists
    const { exists, error } = await checkWaitlistEmail(formData.email);
    
    if (error) {
      return { success: false, error: error };
    }
    
    if (exists) {
      return { success: false, error: "This email is already registered for the waitlist." };
    }

    const waitlistRef = collection(db, 'waitlist');
    const docRef = await addDoc(waitlistRef, {
      name: formData.name,
      email: formData.email,
      createdAt: serverTimestamp(),
      status: 'step1_completed',
      currentStep: 1
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving step 1 data:', error);
    return { success: false, error: error.message };
  }
};

// Update with role selection (Step 2)
export const saveWaitlistStep2 = async (docId, formData) => {
  try {
    const docRef = doc(db, 'waitlist', docId);
    await updateDoc(docRef, {
      role: formData.role,
      status: 'step2_completed',
      currentStep: 2,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error saving step 2 data:', error);
    return { success: false, error: error.message };
  }
};

// Complete waitlist registration (Step 3)
export const saveWaitlistStep3 = async (docId, formData) => {
  try {
    const docRef = doc(db, 'waitlist', docId);
    await updateDoc(docRef, {
      skills: formData.skills,
      clubs: formData.clubs,
      goals: formData.goals,
      status: 'step3_completed',
      currentStep: 3,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error saving step 3 data:', error);
    return { success: false, error: error.message };
  }
};

// Save professional profile and resume (Step 4)
export const saveWaitlistStep4 = async (docId, formData, resumeFile) => {
  try {
    const docRef = doc(db, 'waitlist', docId);
    let resumeUrl = '';

    // Upload resume if provided
    if (resumeFile) {
      // Create a unique file path with timestamp to avoid name conflicts
      const timestamp = Date.now();
      const fileExtension = resumeFile.name.split('.').pop();
      const filePath = `resumes/${docId}/${timestamp}_${resumeFile.name}`;
      
      // Create a reference to the file location
      const fileRef = storageRef(storage, filePath);
      
      // Upload the file
      const uploadResult = await uploadBytes(fileRef, resumeFile);
      
      // Get the download URL
      resumeUrl = await getDownloadURL(uploadResult.ref);
    }

    // Update Firestore document with profile data and resume URL
    await updateDoc(docRef, {
      linkedinProfile: formData.linkedinProfile,
      githubProfile: formData.githubProfile,
      personalWebsite: formData.personalWebsite,
      resumeUrl: resumeUrl,
      resumeFileName: resumeFile ? resumeFile.name : '',
      resumeUploadedAt: serverTimestamp(),
      status: 'completed',
      currentStep: 4,
      completedAt: serverTimestamp()
    });

    return { success: true, resumeUrl };
  } catch (error) {
    console.error('Error saving step 4 data:', error);
    return { success: false, error: error.message };
  }
};

// Get waitlist entry
export const getWaitlistEntry = async (docId) => {
  try {
    const docRef = doc(db, 'waitlist', docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, error: 'No such document!' };
    }
  } catch (error) {
    console.error('Error getting waitlist entry:', error);
    return { success: false, error: error.message };
  }
};

// Authentication functions
export const signUp = async (email, password, additionalData = {}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Save additional user data to Firestore
    const userRef = doc(db, 'users', userCredential.user.uid);
    await updateDoc(userRef, {
      ...additionalData,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    });
    
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Error signing up:', error);
    return { success: false, error: error.message };
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Update last login timestamp
    const userRef = doc(db, 'users', userCredential.user.uid);
    await updateDoc(userRef, {
      lastLogin: serverTimestamp()
    });
    
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Error signing in:', error);
    return { success: false, error: error.message };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error: error.message };
  }
};

export { app, analytics, db, auth, storage }; 