/*
 ** NEWSLETTER
 */
function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test($email);
}
$(document).on("submit", ".newsletter_form", function (e) {
  var $form = $(this);
  var email = $form.find('input[type="email"]').val();
  var accepted = $form.find('input[type="checkbox"]').is(":checked");
  if (email === "" || !validateEmail(email) || !accepted) {
    e.preventDefault();
    $("#msg-newsletter").html("Please fill in all required fields");
    return;
  }
  var confirmMsg =
    $form.attr("target") === "_blank"
      ? "Thank you for your registration ! Check the new tab to confirm."
      : "Thank you for your registration !";
  $("#msg-newsletter").html(confirmMsg);
  setTimeout(function () {
    $("#msg-newsletter").html("");
  }, 5000);
});
