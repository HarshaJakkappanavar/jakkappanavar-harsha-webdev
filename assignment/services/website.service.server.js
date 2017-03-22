/**
 * Created by harsh on 2/28/2017.
 */

module.exports = function (app, model) {
  app.get("/api/user/:userId/website", getWebsitesByUserId);
  app.get("/api/website/:websiteId", getWebsiteByWebsiteId);
  app.post("/api/user/:userId/website", createWebsite);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", "created": new Date() },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", "created": new Date() },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", "created": new Date() },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", "created": new Date() },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", "created": new Date() },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", "created": new Date() }
    ];

  function getWebsitesByUserId(req, res) {
      var userId = req.params['userId'];
      var sites = [];
      for(var w in websites) {
          if(websites[w].developerId === userId) {
              sites.push(websites[w]);
          }
      }
      res.send(sites);
  }

  function getWebsiteByWebsiteId(req, res) {
      var websiteId = req.params['websiteId'];
      for(var w in websites) {
          if(websites[w]._id === websiteId) {
              res.json(websites[w]);
              return;
          }
      }
      res.sendStatus(404);
  }

  function createWebsite(req, res) {
      var userId = req.params['userId'];
      var website = req.body;

      var newWebsite = new Object();
      newWebsite._id = new Date().getTime() + "";
      newWebsite.name = website.name;
      newWebsite.developerId = userId;
      if(null != website.description) {
          newWebsite.description = website.description;
      }
      newWebsite.created = new Date();

      websites.push(newWebsite);
      res.sendStatus(200);
  }

  function updateWebsite(req, res) {

      var websiteId = req.params['websiteId'];
      var website = req.body;
      for(var w in websites) {
          if(websites[w]._id === websiteId) {
              websites[w].name = website.name;
              websites[w].description = website.description;
              res.sendStatus(200);
              return;
          }
      }
      res.sendStatus(404);
  }

  function deleteWebsite(req, res) {
      var websiteId = req.params['websiteId'];
      for(var w in websites) {
          if(websites[w]._id === websiteId) {
              websites.splice(w, 1);
              res.sendStatus(200);
              return;
          }
      }
      res.sendStatus(404);
  }

};
