import { NextResponse } from "next/server";

import { getPrisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 },
    );
  }

  try {
    const lead = await getPrisma().lead.create({
      data: {
        name: String(body.name),
        email: String(body.email),
        company: body.company ? String(body.company) : null,
        budget: body.budget ? String(body.budget) : null,
        message: String(body.message),
      },
    });

    return NextResponse.json({ id: lead.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to persist lead at this moment.",
      },
      { status: 503 },
    );
  }
}
