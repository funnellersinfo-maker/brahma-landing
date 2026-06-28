import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * POST /api/order
 * Registra un pedido Contra Entrega del combo BRAHMA.
 * No se cobra nada online: el cliente paga en efectivo al recibir.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
    }

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").replace(/\s/g, "");
    const city = String(body.city ?? "").trim();
    const address = String(body.address ?? "").trim();
    const tall = String(body.tall ?? "").trim();
    const qty = Number(body.qty) || 1;
    const color = String(body.color ?? "beige").trim();
    const unitPrice = Number(body.unitPrice) || 0;
    const total = Number(body.total) || unitPrice * qty;

    // Validación servidor
    const errors: Record<string, string> = {};
    if (name.length < 3) errors.name = "Nombre inválido";
    if (!/^3\d{8,9}$/.test(phone)) errors.phone = "Celular inválido";
    if (city.length < 2) errors.city = "Ciudad inválida";
    if (address.length < 6) errors.address = "Dirección inválida";
    if (qty < 1 || qty > 9) errors.qty = "Cantidad inválida";
    if (Object.keys(errors).length) {
      return NextResponse.json({ error: "Datos inválidos", errors }, { status: 422 });
    }

    const order = await db.order.create({
      data: {
        name,
        phone,
        city,
        address,
        tall,
        qty,
        color,
        unitPrice,
        total,
        status: "pendiente",
      },
    });

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      message: "Pedido registrado. Te contactaremos por WhatsApp para confirmar.",
    });
  } catch (err) {
    console.error("[/api/order] error:", err);
    return NextResponse.json(
      { error: "No pudimos registrar el pedido. Intenta de nuevo." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "BRAHMA orders" });
}
