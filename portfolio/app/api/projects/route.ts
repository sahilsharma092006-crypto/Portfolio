import { NextRequest, NextResponse } from "next/server";
import getAdmin from "../firebaseAdmin";

// Public read: projects list.
// Firestore collection: projects
// Each document: { name, category, year, description, tags?, images: { thumb, hero } }
export async function GET(_req: NextRequest) {
  const admin = await getAdmin();
  const db = admin.firestore();

  const snap = await db.collection("projects").orderBy("year", "desc").get();
  const projects = snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as any),
  }));

  return NextResponse.json({ projects });
}

