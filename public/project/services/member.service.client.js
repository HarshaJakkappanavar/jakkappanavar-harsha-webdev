/**
 * Created by harsh on 4/14/2017.
 */
(function () {
    angular
        .module("TreasureHuntApp")
        .factory("MemberService", MemberService);

    function MemberService($http) {

        var api = {
            updateMemberLocationForTeam: updateMemberLocationForTeam
        };

        return api;

        function updateMemberLocationForTeam(memberId, latitude, longitude) {
            return $http.put("/project/services/api/member/" + memberId + "/position/update", {latitude: latitude, longitude: longitude});
        }
    }
})();