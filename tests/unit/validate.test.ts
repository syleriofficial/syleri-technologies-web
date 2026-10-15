import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { validateContactSubmission } from "../../src/lib/contact/validate.ts";

function form(fields: Record<string, string>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  return fd;
}

const valid = { name: "Asha Rao", email: "asha@example.com", subject: "Licensing", message: "Hello, I have a question." };

describe("validateContactSubmission", () => {
  it("accepts a valid submission and trims whitespace", () => {
    const r = validateContactSubmission(form({ ...valid, name: "  Asha Rao  ", message: "  Hello, I have a question.  " }));
    assert.equal(r.ok, true);
    if (r.ok) assert.deepEqual(r.data, valid);
  });

  it("reports every missing field", () => {
    const r = validateContactSubmission(form({}));
    assert.equal(r.ok, false);
    if (!r.ok) assert.deepEqual(Object.keys(r.fieldErrors).sort(), ["email", "message", "name", "subject"]);
  });

  it("rejects malformed email addresses", () => {
    for (const email of ["not-an-email", "a@b", "a b@example.com", "@example.com"]) {
      const r = validateContactSubmission(form({ ...valid, email }));
      assert.equal(r.ok, false, email);
      if (!r.ok) assert.ok(r.fieldErrors.email, email);
    }
  });

  it("rejects CR/LF and control characters in single-line fields (header injection)", () => {
    for (const field of ["name", "subject", "email"] as const) {
      for (const bad of ["x\r\nBcc: victim@example.com", "x\nInjected", "x\tTab", "x\u0000Null"]) {
        const value = field === "email" ? `a${bad}@example.com` : bad;
        const r = validateContactSubmission(form({ ...valid, [field]: value }));
        assert.equal(r.ok, false, `${field}: ${JSON.stringify(bad)}`);
        if (!r.ok) assert.ok(r.fieldErrors[field], `${field}: ${JSON.stringify(bad)}`);
      }
    }
  });

  it("allows line breaks in the message body", () => {
    const r = validateContactSubmission(form({ ...valid, message: "Line one\nLine two\r\nLine three" }));
    assert.equal(r.ok, true);
  });

  it("enforces length limits", () => {
    const cases: [string, string][] = [
      ["name", "x".repeat(121)],
      ["email", `${"a".repeat(250)}@example.com`],
      ["subject", "x".repeat(151)],
      ["message", "x".repeat(5001)],
      ["message", "too short"],
    ];
    for (const [field, value] of cases) {
      const r = validateContactSubmission(form({ ...valid, [field]: value }));
      assert.equal(r.ok, false, `${field} length ${value.length}`);
      if (!r.ok) assert.ok(r.fieldErrors[field as keyof typeof r.fieldErrors]);
    }
  });

  it("ignores non-string (file) values", () => {
    const fd = form(valid);
    fd.set("name", new Blob(["x"]));
    const r = validateContactSubmission(fd);
    assert.equal(r.ok, false);
    if (!r.ok) assert.ok(r.fieldErrors.name);
  });
});
