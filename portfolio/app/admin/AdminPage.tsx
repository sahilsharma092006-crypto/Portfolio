"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { auth, storage, db } from "@/firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject
} from "firebase/storage";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { collection, addDoc, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { useProjects } from "@/app/useProjects";



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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserEmail(user?.email ?? null);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      setStatus("Login failed: " + (e as Error).message);
    }
  };

  const onPick = (key: "thumbFile" | "heroFile") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0] ?? null;
      setForm((prev) => ({ ...prev, [key]: f }));
    };

  const upload = async () => {
    try {
      setUploading(true);
      setStatus("Uploading to Firebase Storage...");

      if (!form.name || !form.thumbFile) {
        setStatus("Name and Thumbnail are required.");
        return;
      }

      const user = auth.currentUser;
      if (!user) {
        setStatus("Not signed in.");
        return;
      }

      // idToken could be used for server-authorized uploads.
      // Current flow writes metadata directly to Firestore.

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

      // Write directly to Firestore (Compatible with Static Export)
      await addDoc(collection(db, "projects"), {
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
        createdAt: serverTimestamp()
      });

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
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Upload failed";
      setStatus(message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (projectId: string, imageUrls: string[]) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
      setStatus("Deleting project...");
      // Delete from Firestore
      await deleteDoc(doc(db, "projects", projectId));
      
      // Note: Full storage cleanup would require storing paths, 
      // but deleting the metadata removes it from the site instantly.
      
      setStatus("Project deleted successfully ✅");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Delete failed";
      setStatus(message);
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
          <p className="mt-1 text-white/70 text-sm">
            Upload project images/videos and save metadata (Firestore).
          </p>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
            <div className="text-sm text-white/70">
              Signed in as: <span className="text-white/90">{userEmail ?? "—"}</span>
            </div>
            
            {!userEmail ? (
              <button
                onClick={handleLogin}
                className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-bold text-black hover:bg-white/90"
              >
                Sign in with Google
              </button>
            ) : (
              <button onClick={() => signOut(auth)} className="mt-2 text-xs text-red-400 underline">
                Sign Out
              </button>
            )}

            {isAdmin && (
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
            )}
          </div>
        </motion.div>

        {isAdmin && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">Manage Projects</h2>
            <div className="grid gap-4">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-center gap-4">
                    <img src={project.images.thumb} className="h-12 w-12 rounded-lg object-cover" alt="" />
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-xs text-white/50">{project.category} — {project.year}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(project.id, [project.images.thumb || "", project.images.hero || ""])}
                    className="text-xs font-bold text-red-400 hover:text-red-300 uppercase tracking-widest"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
