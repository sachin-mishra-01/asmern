// utils/seed.js
const Tenant = require("../models/Tenant");
const User = require("../models/User");
const Note = require("../models/Note");
const bcrypt = require("bcryptjs");

async function seedIfNeeded() {
  const cnt = await Tenant.countDocuments();
  if (cnt > 0) {
    console.log("Seed: tenants already exist -> skipping seed");
    return;
  }

  console.log("Seeding initial data...");

  const acme = new Tenant({ name: "Acme", slug: "acme", plan: "free" });
  const globex = new Tenant({ name: "Globex", slug: "globex", plan: "free" });
  await acme.save();
  await globex.save();

  const pwHash = await bcrypt.hash("password", 10);

  const users = [
    new User({ email: "admin@acme.test", passwordHash: pwHash, role: "admin", tenantId: acme._id, tenantSlug: "acme" }),
    new User({ email: "user@acme.test", passwordHash: pwHash, role: "member", tenantId: acme._id, tenantSlug: "acme" }),
    new User({ email: "admin@globex.test", passwordHash: pwHash, role: "admin", tenantId: globex._id, tenantSlug: "globex" }),
    new User({ email: "user@globex.test", passwordHash: pwHash, role: "member", tenantId: globex._id, tenantSlug: "globex" })
  ];
  await User.insertMany(users);

  // sample notes
  await Note.insertMany([
    { tenantId: acme._id, title: "Acme welcome", body: "Welcome Acme team", createdBy: "admin@acme.test" },
    { tenantId: globex._id, title: "Globex welcome", body: "Welcome Globex team", createdBy: "admin@globex.test" }
  ]);

  console.log("Seed complete: tenants, users, sample notes created");
}

module.exports = seedIfNeeded;
