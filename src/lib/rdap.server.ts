const FETCH_TIMEOUT_MS = 5000;

export interface DomainAge {
  registeredAt: string;
  ageDays: number;
}

interface RdapEvent {
  eventAction?: string;
  eventDate?: string;
}

export async function lookupDomainAge(
  domain: string,
): Promise<DomainAge | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(
      `https://rdap.org/domain/${encodeURIComponent(domain)}`,
      {
        signal: controller.signal,
        headers: { Accept: "application/rdap+json" },
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { events?: RdapEvent[] };
    const registrationEvent = data.events?.find(
      (e) => e.eventAction === "registration",
    );
    if (!registrationEvent?.eventDate) return null;
    const registeredAt = new Date(registrationEvent.eventDate);
    if (Number.isNaN(registeredAt.getTime())) return null;
    const ageDays = Math.floor(
      (Date.now() - registeredAt.getTime()) / (1000 * 60 * 60 * 24),
    );
    return { registeredAt: registrationEvent.eventDate, ageDays };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
