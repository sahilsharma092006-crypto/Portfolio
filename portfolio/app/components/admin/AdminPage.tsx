"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getAuth } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Admin page is protected by our server route (requires allowed admin email).
// But we still require the user to be signed in.

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function ensureFirebase() {
  if (!getApps().length) {
    initializeApp(firebaseConfig as any);
  }
}

type ProjectImages = { thumb?: string; hero?: string };

type UploadForm = {
  name: string;
  category: string;
  year: string;
  description: string;
  tags: string;
  thumbFile: File | null;
  heroFile: File | null;
};

export default function AdminPage() {
  ensureFirebase();

  const [authReady, setAuthReady] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Sign in to upload projects.");

  const [form, setForm] = useState<UploadForm>({
    name: "",
    category: "",
    year: "",
    description: "",
    tags: "",
    thumbFile: null,
    heroFile: null,
  });

  const [uploading, setUploading] = useState(false);

  const app = useMemo(() => {
    try {
      const { getApp } = require("firebase/app");
      return getApp();
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    // Lazy check auth state.
    const auth = getAuth();
    setAuthReady(true);
    const u = auth.currentUser;
    setUserEmail(u?.email ?? null);

    // If you want a full sign-in UI, we can add it.
    // For now: user should sign in using Firebase Auth elsewhere or we add Google UI.
  }, []);

  const onPick = (key: "thumbFile" | "heroFile") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0] ?? null;
      setForm((prev) => ({ ...prev, [key]: f }));
    };

  const upload = async () => {
    try {
      setUploading(true);
      setStatus("Uploading to Firebase Storage...");

      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        setStatus("Not signed in.");
        return;
      }

      const idToken = await user.getIdToken();

      const storage = getStorage();

      let thumbUrl: string | undefined;
      let heroUrl: string | undefined;

      const uidPrefix = `projects/${Date.now()}`;

      if (form.thumbFile) {
        const thumbRef = ref(storage, `${uidPrefix}/thumb-${form.thumbFile.name}`);
        await uploadBytes(thumbRef, form.thumbFile);
        thumbUrl = await getDownloadURL(thumbRef);
      }

      if (form.heroFile) {
        const heroRef = ref(storage, `${uidPrefix}/hero-${form.heroFile.name}`);
        await uploadBytes(heroRef, form.heroFile);
        heroUrl = await getDownloadURL(heroRef);
      }

      setStatus("Saving metadata to Firestore...");

      // Write metadata via our protected route.
      const res = await fetch("/api/projects/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          year: form.year,
          description: form.description,
          tags: form.tags
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          images: {
            thumb: thumbUrl,
            hero: heroUrl,
          },
        }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Failed to save");
      }

      setStatus("Uploaded successfully ✅");
      setForm({
        name: "",
        category: "",
        year: "",
        description: "",
        tags: "",
        thumbFile: null,
        heroFile: null,
      });
    } catch (e: any) {
      setStatus(e?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="mx-auto w-full max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold">Admin Upload</h1>
          <p className="mt-2 text-white/70 text-sm">
            Upload project images/videos and save metadata (Firestore).
          </p>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
            <div className="text-sm text-white/70">
              Signed in as: <span className="text-white/90">{userEmail ?? "—"}</span>
            </div>

            <div className="mt-4 space-y-4">
              <label className="block">
                <div className="text-xs uppercase tracking-wide text-white/60">Name</div>
                <input
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <div className="text-xs uppercase tracking-wide text-white/60">Category</div>
                  <input
                    value={form.category}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, category: e.target.value }))
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2"
                  />
                </label>

                <label className="block">
                  <div className="text-xs uppercase tracking-wide text-white/60">Year</div>
                  <input
                    value={form.year}
                    onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2"
                  />
                </label>
              </div>

              <label className="block">
                <div className="text-xs uppercase tracking-wide text-white/60">Description</div>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  className="mt-2 min-h-[110px] w-full resize-none rounded-xl border border-white/10 bg-black/30 px-3 py-2"
                />
              </label>

              <label className="block">
                <div className="text-xs uppercase tracking-wide text-white/60">
                  Tags (comma separated)
                </div>
                <input
                  value={form.tags}
                  onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <div className="text-xs uppercase tracking-wide text-white/60">Thumb</div>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={onPick("thumbFile")}
                    className="mt-2 w-full"
                  />
                </label>

                <label className="block">
                  <div className="text-xs uppercase tracking-wide text-white/60">Hero</div>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={onPick("heroFile")}
                    className="mt-2 w-full"
                  />
                </label>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={upload}
                  disabled={uploading}
                  className="rounded-full bg-blue-500/20 px-5 py-2 text-sm font-semibold ring-1 ring-blue-400/30 backdrop-blur disabled:opacity-60"
                >
                  {uploading ? "Uploading..." : "Upload Project"}
                </button>
                <div className="text-sm text-white/70">{status}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

