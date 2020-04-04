module.exports = {
  async up(db) {
    await db.collection('users').insertOne(
      {
        name: 'System Admin',
        email: 'sys-admin@mean.com',
        password: '$2a$10$hoCaNh3hvNFCdtiaoW4yiebT3.MxYAp9nk2SyiBtfNbV/r.FapMbS',
        roles: ['SYSADMIN'],
      },
    );
  },

  async down(db) {
    await db.collection('users').removeOne({ email: 'sys-admin@mean.com' });
  },
};
