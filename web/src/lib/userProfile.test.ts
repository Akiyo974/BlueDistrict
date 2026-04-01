import { describe, expect, it } from "vitest";
import { getDisplayName, getHeadline } from "@/lib/userProfile";

describe("userProfile helpers", () => {
  it("returns full_name first for display name", () => {
    expect(getDisplayName({ full_name: "Christen Dijoux", name: "Christen" })).toBe(
      "Christen Dijoux"
    );
  });

  it("falls back to email when name fields are missing", () => {
    expect(getDisplayName({ email: "christen.dijoux@gmail.com" })).toBe(
      "christen.dijoux@gmail.com"
    );
  });

  it("returns default display name for empty metadata", () => {
    expect(getDisplayName(undefined)).toBe("Utilisateur");
  });

  it("returns headline when present", () => {
    expect(getHeadline({ headline: "Builder" })).toBe("Builder");
  });

  it("falls back to email for headline", () => {
    expect(getHeadline({ email: "christen.dijoux@gmail.com" })).toBe("christen.dijoux@gmail.com");
  });
});
