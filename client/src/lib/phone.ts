/**
 * US phone helpers.
 * Canonical display format: (XXX) XXX-XXXX
 */

/** Progressively formats keystrokes into the US phone format `(XXX) XXX-XXXX`. */
export function formatUsPhone(input: string): string {
  let raw = input.replace(/\D/g, "");
  // Drop a leading US country code so "+1 910-902-0014" formats cleanly.
  if (raw.length === 11 && raw.startsWith("1")) raw = raw.slice(1);

  const digits = raw.slice(0, 10);
  const len = digits.length;

  if (len === 0) return "";
  if (len < 4) return `(${digits}`;
  if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** True when the value holds a complete 10-digit US phone number. */
export function isCompleteUsPhone(value: string): boolean {
  return value.replace(/\D/g, "").length === 10;
}

/** Zod-friendly regex for the canonical `(XXX) XXX-XXXX` format. */
export const US_PHONE_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/;
