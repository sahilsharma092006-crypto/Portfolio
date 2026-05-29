import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// Ensure the Firebase Admin SDK is initialized only once.
let adminApp;
if (!getApps().length) {
  // Replace with your actual service account key path or environment variable
  // For production, it's recommended to use environment variables for credentials.
  // Example: process.env.FIREBASE_SERVICE_ACCOUNT_KEY
const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!raw) {
    throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_KEY env var');
  }

  let svc;
  try {
    svc = JSON.parse(raw);
  } catch {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY must be valid JSON (service account contents)');
  }

  if (typeof svc?.project_id !== 'string' || !svc.project_id) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY JSON must include a string "project_id"');
  }

  adminApp = initializeApp({
    credential: cert(svc),
  });
} else {
  adminApp = getApps()[0];
}

export const adminFirestore = getFirestore(adminApp);
export const adminAuth = getAuth(adminApp);
export default adminApp;