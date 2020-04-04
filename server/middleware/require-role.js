const requireRole = (...allowed) => {
  const isAllowed = (role) => allowed.indexOf(role) > -1;

  return (req, res, next) => {
    const found = req.user.roles.find((role) => isAllowed(role));

    if (found) {
      return next();
    }

    return res.status(401).json({ message: 'Unauthorized' });
  };
};

module.exports = requireRole;
