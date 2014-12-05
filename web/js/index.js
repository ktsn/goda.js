/**
 * Created with IntelliJ IDEA.
 * User: katashin
 * Date: 12/4/14
 */

$(function() {
  var PDF = new PDFView($('#doc-container'));
  PDF.changeDoc('hello.pdf');

  $('#_scale').change(function(event) {
    PDF.changeScale(parseInt(event.target.value) / 100);
  });
});
