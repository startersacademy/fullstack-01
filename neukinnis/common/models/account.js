module.exports = function(account) {
  account.validatesInclusionOf('account_type', {
    in: ['federal', 'enterprise', 'commercial'], message: 'not a valid account type'
  });
};
