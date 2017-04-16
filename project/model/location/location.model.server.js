/**
 * Created by harsh on 4/8/2017.
 */

var q = require('q');
var mongoose = require('mongoose');
mongoose.Promise = q.Promise;
var LocationSchema = require('./location.schema.server');
var LocationModel = mongoose.model('LocationModel', LocationSchema);
var model = '';

LocationModel.setModel = setModel;
LocationModel.createLocation = createLocation;
LocationModel.getLocationById = getLocationById;
LocationModel.updateLocation = updateLocation;
module.exports = LocationModel;

function setModel(_model) {
    model = _model;
}

function createLocation(location) {
    var deferred = q.defer();
    LocationModel
        .create(location, function (err, location) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(location);
            }
        });
    return deferred.promise;
}

function getLocationById(locationId) {
    var deferred = q.defer();
    LocationModel
        .findOne({_id: locationId}, function (err, location) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(location);
            }
        });
    return deferred.promise;
}

function updateLocation(location) {
    var deferred = q.defer();
    LocationModel
        .findById(location.id, function (err, locationObj) {
            locationObj.latitude = location.latitude;
            locationObj.longitude = location.longitude;
            locationObj.save(function (err, newlocationObj) {
                if(err) {
                    deferred.reject(err);
                }else {
                    deferred.resolve(newlocationObj);
                }
            });
        });
    return deferred.promise;
}