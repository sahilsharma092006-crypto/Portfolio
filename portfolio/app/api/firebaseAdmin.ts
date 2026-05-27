import { cert } from "firebase-admin/app";
import admin from "firebase-admin";

// NOTE: Uses service account credentials from env var.
// Set FIREBASE_SERVICE_ACCOUNT_JSON in your hosting env.
// Example (JSON string):
// { "type": "service_account", "project_id": "...", "private_key": "...", "client_email": "...", ... }

const getAdmin = async () => {
  if (!admin.apps.length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (!raw) {
      throw new Error(
        "Missing FIREBASE_SERVICE_ACCOUNT_JSON env var for Firebase Admin SDK"
      );
    }

    const json = JSON.parse(raw);

    admin.initializeApp({
      credential: cert(json),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
  }

  return admin;
};

export default getAdmin;

