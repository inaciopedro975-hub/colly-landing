"use server";

export type ScheduleResult =
  | { ok: true; message: string }
  | { ok: false; error: string };

export async function scheduleVisit(
  _prev: ScheduleResult | null,
  formData: FormData
): Promise<ScheduleResult> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const eventType = String(formData.get("eventType") ?? "").trim();
  const eventDate = String(formData.get("eventDate") ?? "").trim();
  const guests = String(formData.get("guests") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !phone || !eventType) {
    return { ok: false, error: "Por favor, preencha nome, telefone e tipo de evento." };
  }
  if (!/^[0-9()+\-\s]{8,}$/.test(phone)) {
    return { ok: false, error: "Telefone inválido." };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "E-mail inválido." };
  }

  // TODO: integrar com e-mail/CRM. Por ora apenas loga.
  console.log("[Colly] Nova solicitação de visita:", {
    name,
    phone,
    email,
    eventType,
    eventDate,
    guests,
    message,
    at: new Date().toISOString(),
  });

  return {
    ok: true,
    message: "Recebido! Entraremos em contato em até 24h para confirmar sua visita.",
  };
}
