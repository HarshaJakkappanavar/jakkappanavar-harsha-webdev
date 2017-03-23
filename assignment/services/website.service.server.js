/**
 * Created by harsh on 2/28/2017.
 */

module.exports = function (app, model) {
  app.get("/api/user/:userId/website", getWebsitesByUserId);
  app.get("/api/website/:websiteId", getWebsiteByWebsiteId);
  app.post("/api/user/:userId/website", createWebsite);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

    /*var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", "created": new Date() },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", "created": new Date() },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", "created": new Date() },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", "created": new Date() },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", "created": new Date() },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", "created": new Date() }
    ];*/

  function getWebsitesByUserId(req, res) {
      var userId = req.params['userId'];
      model.websiteModel
          .findAllWebsiteForUser(userId)
          .then(function (websites) {
              res.json(websites);
          },
          function (error) {
              res.sendStatus(404);
          });
  }

  function getWebsiteByWebsiteId(req, res) {
      var websiteId = req.params['websiteId'];
      model.websiteModel
          .findWebsiteById(websiteId)
          .then(function (website) {
              res.json(website);
          }, function (error) {
              res.sendStatus(404);
          });
  }

  function createWebsite(req, res) {
      var userId = req.params['userId'];
      var website = req.body;
      model.websiteModel
          .createWebsiteForUser(userId, website)
          .then(function (website) {
              res.sendStatus(200);
          }, function (error) {
              res.sendStatus(404);
          });
  }

  function updateWebsite(req, res) {

      var websiteId = req.params['websiteId'];
      var website = req.body;
      model.websiteModel
          .updateWebsite(websiteId, website)
          .then(function (website) {
              res.sendStatus(200);
          }, function (error) {
              res.sendStatus(404);
          });
  }

  function deleteWebsite(req, res) {
      var websiteId = req.params['websiteId'];
      model.websiteModel
          .deleteWebsite(websiteId)
          .then(function () {
              res.sendStatus(200);
          }, function (error) {
              res.sendStatus(404);
          });
  }

};
