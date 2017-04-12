/**
 * Created by harsh on 4/8/2017.
 */

var ProjectUserModel = require('./user/user.model.server');
var EventModel = require('./event/event.model.server');
var CheckpointModel = require('./checkpoint/checkpoint.model.server');
var TeamModel = require('./team/team.model.server');
var MemberModel = require('./member/member.model.server');
var LocationModel = require('./location/location.model.server');

var model = {
    ProjectUserModel: ProjectUserModel,
    EventModel: EventModel,
    CheckpointModel: CheckpointModel,
    TeamModel: TeamModel,
    MemberModel: MemberModel,
    LocationModel: LocationModel
};

ProjectUserModel.setModel(model);
EventModel.setModel(model);
CheckpointModel.setModel(model);
TeamModel.setModel(model);
MemberModel.setModel(model);
LocationModel.setModel(model);

module.exports = model;
