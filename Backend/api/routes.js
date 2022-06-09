'use strict';

module.exports = function(app) {
  var productsCtrl = require('./controllers/ProductsController');
  var exportCtrl = require('./controllers/ExportController');

  // todoList Routes
  app.route('/products')
    .get(productsCtrl.get);

  app.route('/products/paging')
    .get(productsCtrl.paging);

  app.route('/products/export')
    .get(productsCtrl.export);

  // app.route('/products/:productId')
  //   .get(productsCtrl.detail)
  //   .put(productsCtrl.update)
  //   .delete(productsCtrl.delete);

  app.route('/export')
    .get(exportCtrl.get);
};