import { NextResponse } from "next/server";

import { getPrisma } from "@/lib/prisma";
import { allowRequest } from "@/lib/rate-limit";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const requestHost = request.headers.get("x-forwarded-host") || request.headers.get("host") || new URL(request.url).host;
  if (!origin || new URL(origin).host !== requestHost) {
    return NextResponse.json({ error: "Origem não permitida." }, { status: 403 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const attempt = allowRequest(`lead:${ip}`);
  if (!attempt.allowed) {
    return NextResponse.json({ error: "Muitas tentativas. Tente novamente mais tarde." }, { status: 429, headers: { "Retry-After": String(attempt.retryAfter) } });
  }

  const body = await request.json().catch(() => null);
  const input = {
    name: text(body?.name, 100),
    email: text(body?.email, 160).toLowerCase(),
    company: text(body?.company, 120),
    budget: text(body?.budget, 80),
    message: text(body?.message, 3000),
  };

  if (input.name.length < 2 || !EMAIL.test(input.email) || input.message.length < 10) {
    return NextResponse.json(
      { error: "Revise nome, e-mail e mensagem." },
      { status: 400 },
    );
  }

  try {
    const lead = await getPrisma().lead.create({
      data: {
        name: input.name,
        email: input.email,
        company: input.company || null,
        budget: input.budget || null,
        message: input.message,
      },
    });

    return NextResponse.json({ id: lead.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível enviar agora. Tente novamente mais tarde." },
      { status: 503 },
    );
  }
}
