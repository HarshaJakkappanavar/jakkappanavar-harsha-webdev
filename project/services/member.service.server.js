/**
 * Created by harsh on 4/8/2017.
 */

module.exports = function (app, model) {

    app.put("/project/services/api/member/:memberId/position/update", updateMemberLocationForTeam);

    function updateMemberLocationForTeam(req, res) {
        var memberId = req.params.memberId;
        var location = req.body;

        model.LocationModel
            .createLocation(location)
            .then(function (location) {
               model.MemberModel
                   .addLocationToMember(memberId, location._id)
                   .then(function (member) {
                       res.send(200);
                   }, function (error) {
                       res.sendStatus(400);
                   })
            }, function (error) {
                res.sendStatus(400);
            });
    }

};