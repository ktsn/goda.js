/**
 * Created with IntelliJ IDEA.
 * User: katashin
 * Date: 12/4/14
 */

;(function(window, document, $, PDFJS) {

  var PDFView = function(container) {
    this.container = container;
    this.pdf = null;
    this.scale = 1;
  };

  $.extend(PDFView.prototype, {
    pageNum: function() {
      return this.pdf === null ? 0 : this.pdf.numPages;
    },

    changeDoc: function(url) {
      PDFJS.getDocument(url).then(function(pdf) {
        this.pdf = pdf;
        for (var i = 1; i <= this.pdf.numPages; i++) {
          var canvas = $('<canvas></canvas>').addClass('pdf-page-canvas');

          this.container.append(canvas);

          var ctx = canvas[0].getContext('2d');
          this.renderPage(ctx, i, this.scale);
        }
      }.bind(this));
    },

    renderPage: function(ctx, pageNum, scale) {
      this.pdf.getPage(pageNum).then(function(page) {
        var viewport = page.getViewport(scale);
        ctx.canvas.height = viewport.height;
        ctx.canvas.width = viewport.width;

        var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        page.render(renderContext);
      });
    },

    changeScale: function(scale) {
      this.scale = scale;
      var canvasList = this.container.children('canvas');
      for (var i = 0, ii = canvasList.length; i < ii; i++) {
        this.renderPage(canvasList[i].getContext('2d'), i + 1, this.scale);
      }
    }
  });

  window.PDFView = PDFView;

})(window, document, jQuery, PDFJS);
