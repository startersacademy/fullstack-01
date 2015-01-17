module.exports = function(account) {
  // account.validatesPresenceOf('cust_name', {message: 'Cannot be blank'});
  // account.validatesPresenceOf('account_type', {message: 'Cannot be blank'});
  account.validatesInclusionOf('account_type', {
    in: ['federal', 'enterprise', 'commercial'], message: 'not a valid account type'
  });
};
