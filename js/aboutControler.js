// page('about', about);

console.log("about controler loaded");

function about() {
  console.log("about controler running");
  $('#articleWrapper').fadeOut('slow');
  $('#aboutDiv').fadeIn();
  console.log("about controler ran!");
}
