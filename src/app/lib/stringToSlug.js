export default function stringToSlug(str) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')  // Remove special characters
        .replace(/\s+/g, '-')         // Replace spaces with hyphens
        .replace(/^-+|-+$/g, '');     // Trim extra hyphens from the beginning and end
}