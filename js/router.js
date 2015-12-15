// Configure routes for this app:
page('/', articleController.index);
page('/about', aboutController.index);
page('/', index);

page();

function about() {
        document.querySelector('p')
          .textContent = 'viewing about';
      }

function index() {
  document.querySelector('p')
  .textContent = 'viewing index';
  }
