// Configure routes for this app:
page('/', articleController.index);
page('/about', aboutController.index);
page('/home', index);
page('/stats', stats);
page('secret', secret.index);

page();
page.base('/');



function index() {
  document.querySelector('p')
  .textContent = 'viewing index';
  }

function secret (){

}
function stats (){

}
