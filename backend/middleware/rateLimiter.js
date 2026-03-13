const buckets = new Map();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

const contactLimiter = (req, res, next) => {
  const key = req.ip || req.headers["x-forwarded-for"] || "unknown";
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || now > current.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }

  if (current.count >= MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: "Too many requests. Try again later.",
    });
  }

  current.count += 1;
  buckets.set(key, current);
  next();
};

module.exports = contactLimiter;
