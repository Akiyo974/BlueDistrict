type UserMetadata = {
  full_name?: string;
  name?: string;
  email?: string;
  headline?: string;
};

export function getDisplayName(metadata: UserMetadata | null | undefined): string {
  if (!metadata) {
    return "Utilisateur";
  }

  return metadata.full_name ?? metadata.name ?? metadata.email ?? "Utilisateur";
}

export function getHeadline(metadata: UserMetadata | null | undefined): string {
  if (!metadata) {
    return "";
  }

  return metadata.headline ?? metadata.email ?? "";
}
