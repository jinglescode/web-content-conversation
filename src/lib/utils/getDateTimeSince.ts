export default function getDateTimeSince(timestamp: number) {
  var dateNow = new Date();

  timestamp = timestamp * 1000;
  var datetimeSince = new Date(timestamp);

  var diff = dateNow.getTime() - datetimeSince.getTime();

  var msec = diff;
  var hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  var mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  var ss = Math.floor(msec / 1000);
  msec -= ss * 1000;

  if (hh >= 24) {
    return Math.floor(hh / 24).toString() + "d";
  }

  if (hh >= 1) {
    return hh + "h";
  }

  if (mm >= 1) {
    return mm + "m";
  }

  if (ss >= 1) {
    return ss + "s";
  }
}