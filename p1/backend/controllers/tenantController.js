// controllers/tenantController.js
const Tenant = require("../models/Tenant");

// Upgrade a tenant to Pro plan
const upgradeTenant = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const tenant = await Tenant.findOne({ slug });
    if (!tenant) {
      return res.status(404).json({ error: "Tenant not found" });
    }

    // Only admins allowed (adminOnly middleware already checked)
    tenant.plan = "pro";
    await tenant.save();

    res.json({ success: true, plan: tenant.plan });
  } catch (err) {
    next(err);
  }
};

module.exports = { upgradeTenant };
