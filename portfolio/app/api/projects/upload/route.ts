import { NextRequest, NextResponse } from "next/server";
import getAdmin from "../../firebaseAdmin";

// NOTE: This route expects Firebase Storage upload to be handled client-side,
// and then we write the project metadata in Firestore.
// For security, we verify the caller is an admin via Authorization Bearer ID token.

async function requireAdmin(req: NextRequest) {
  const header = req.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    throw new Error("Missing Authorization Bearer token");
  }

  const admin = await getAdmin();
  const auth = admin.auth();
  const decoded = await auth.verifyIdToken(token);

  const allowed = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!allowed.length) {
    throw new Error("ADMIN_EMAILS env var not configured");
  }

  if (!decoded.email || !allowed.includes(decoded.email)) {
    throw new Error("Forbidden");
  }

  return decoded;
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req);

    const body = await req.json();
    const admin = await getAdmin();
    const db = admin.firestore();

    // Expected body:
    // { name, category, year, description, tags?, images: { thumb, hero } }
    const { name, category, year, description, tags, images } = body || {};

    if (!name || !category || !year || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const docRef = await db.collection("projects").add({
      name,
      category,
      year,
      description,
      tags: Array.isArray(tags) ? tags : [],
      images: images && typeof images === "object" ? images : {},
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ ok: true, id: docRef.id });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Upload failed" },
      { status: 401 }
    );
  }
}

