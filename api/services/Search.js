/* global Reference, User */

var _ = require('lodash');
var asyn = require('async');

module.exports.quick = function (searchData, cb) {
  var appData = {
      limit: 20,
      sort: "createdAt DESC",
      skip: searchData.skip || 0
    },
    orData = [],
    tempOrData = [],
    keyword = searchData.description,
    userName = searchData.user,
    types = searchData.categories;

  if (types) {
    appData.type = types;
  }

  tempOrData.push({description: {'contains': keyword}});
  tempOrData.push({gave: {'contains': keyword}});
  tempOrData.push({got: {'contains': keyword}});

  User.find({name: {contains: userName}}).exec(function (err, users) {
    if (!userName) {
      orData = tempOrData;
      orData.push({user2: {'contains': keyword}});
    } else if (!users || users.length === 0) {
      orData = tempOrData;
      appData.user2 = {'contains': userName};
    } else {
      var usernames = [];
      users.forEach(function (user) {
        usernames.push(user.name);
      });
      tempOrData.forEach(function (elUser1) {
        var elUser2 = _.cloneDeep(elUser1);
        elUser1.user = usernames;
        orData.push(elUser1);
        elUser2.user2 = {'contains': userName};
        orData.push(elUser2);
      });
    }

    appData.or = orData;

    Reference.find(appData).exec(function (err, apps) {
      async.map(apps, function (ref, callback) {
        User.findOne({name: ref.user}).exec(function (err, refUser) {
          if (refUser) {
            ref.user = refUser.name;
            callback(null, ref);
          } else {
            callback();
          }
        });
      }, function (err, results) {
        cb(results);
      });
    });
  });
};