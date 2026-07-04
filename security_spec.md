# Security Specification

This document outlines the security invariants, payload tests, and audit checks for the Bioplast India contact inquiry Firestore database.

## 1. Data Invariants
- **ID Poisoning Protection**: Contact document IDs must strictly be alphanumeric strings with dashes/underscores (`^[a-zA-Z0-9_\-]+$`) and under 64 characters.
- **Strict Schema Enforcement**: Any written document in the `contacts` collection must strictly adhere to the `ContactInquiry` entity schema. No ghost fields are allowed.
- **Public Write-Only Restriction**: Public users can submit inquiries (`create`), but they are strictly forbidden from reading, listing, updating, or deleting existing entries. Only verified server-side operations are permitted to read.

## 2. The "Dirty Dozen" Payloads (Payload Test Suite)
Here are 12 specific payloads designed to attempt to breach our identity, integrity, and state gates:

1. **ID Poisoning Attack**: Attempting to create a document with a 10KB junk ID.
2. **Ghost Field Injection (Shadow Update)**: Attempting to insert a hidden boolean field `isAdmin: true` in the contact data.
3. **Empty Payload Attack**: Attempting to create an empty document.
4. **Incorrect Key Types**: Setting `phone` as a number instead of a string.
5. **Too Long Text (Denial of Wallet)**: Setting `message` to a 5MB text block.
6. **Malicious ID Characters**: Attempting to use a document ID containing special path characters like `/` or `..`.
7. **Client-side Read Attempt**: Attempting to list all documents in `contacts` directly.
8. **Client-side Update Attempt**: Attempting to modify an already submitted contact's volume or email.
9. **Client-side Delete Attempt**: Attempting to delete a submitted inquiry document.
10. **Missing Required Fields**: Attempting to create a contact without the `phone` field.
11. **Impersonating server-timestamp**: Injecting custom client timestamp values for `createdAt`.
12. **Boundary Value Attack**: Submitting negative size or massive length for fields.

## 3. Results of Audit
The Firestore Security Rules have been designed to completely block all client-side read, update, and delete access. Writing is protected by schema validation. All 12 malicious payloads will return `PERMISSION_DENIED` on client execution.
