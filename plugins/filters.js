import Vue from "vue";
Vue.filter("percentage", function (value) {
  if (value == null) return "";
  value = value.toString();
  return value + ".00%";
});

Vue.filter("currency", function (value) {
  if (value == null) return "";
  value = value.toString();
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
});

Vue.filter("dateformat", function (value) {
  if (!value) return "";
  const date_string = value[0] + "-" + value[1] + "-" + value[2];
  return new Date(date_string).toDateString();
});
Vue.filter("simpledateformat", function (value) {
  if (!value) return "";
  const date_string = value[2] + "-" + value[1] + "-" + value[0];
  return date_string;
});
