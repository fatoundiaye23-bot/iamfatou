/*
 ** NEWSLETTER
 */
function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test($email);
}
$(document).on("submit", ".newsletter_form", function (e) {
  var email = $('.newsletter_form input[type="email"]').val();
  var accepted = $('.newsletter_form input[type="checkbox"]').is(":checked");
  if (email === "" || !validateEmail(email) || !accepted) {
    e.preventDefault();
    $("#msg-newsletter").html("Please fill in all required fields");
    return;
  }
  $("#msg-newsletter").html(
    "Thank you for your registration ! Check the new tab to confirm."
  );
  setTimeout(function () {
    $("#msg-newsletter").html("");
  }, 5000);
});
