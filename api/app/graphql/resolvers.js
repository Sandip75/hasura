const { getUserList, getUserListWithLocation } = require("../db/query/user");

module.exports = {
  Query: {
    async getUserList(root, args, context) {
      const { limit, offset } = args;
      let data = await getUserList(limit, offset);
      return data;
    },
    async findUsers(root, args, context) {
      const { radius, lat, lng } = args;
      let centerPoint = { lat: lat, lng: lng };
      let data = await getUserListWithLocation();

      let result = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i].location && data[i].location.length) {
          
          for (let j = 0; j < data[i].location.length; j++) {
            let checkPoint = {
              lat: data[i].location[j].lat,
              lng: data[i].location[j].lng,
            };
            let nearby = arePointsNear(checkPoint, centerPoint, radius);
            if (nearby) {
              result.push({
                first_name: data[i].first_name,
                last_name: data[i].last_name,
                gender: data[i].gender,
                location: {
                  lat: data[i].location[j].lat,
                  lng: data[i].location[j].lng,
                },
              });
            }
          }
        }
      }

      return result;
    },
  },
};

function arePointsNear(checkPoint, centerPoint, radius) {
  var ky = 40000 / 360;
  var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= radius;
}
