/*
 ** NEWSLETTER
 */
function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test($email);
}
$(document).on("submit", ".newsletter_form", function (e) {
  e.preventDefault();
  var email = $('.newsletter_form input[type="email"]').val();
  if (
    email !== "" &&
    validateEmail(email) &&
    $('.newsletter_form input[type="checkbox"]').is(":checked")
  ) {
    $.ajax({
      type: "POST",
      url: "/wp-content/themes/iam-fatou/newsletter.php",
      data: $(this).serialize(),
      // error: function (error) {
      // },
      success: function (data) {
        let result = JSON.parse(data);
        if (result.errors) {
          throw new Error(result.detail);
        }
        $("#msg-newsletter").html(
          "Thank you for your registration ! You will soon receive the firm's newsletter."
        );
        setTimeout(function () {
          $("#msg-newsletter").html("");
        }, 5000);
        $(".newsletter_form")[0].reset();
      },
    });
  } else {
    $("#msg-newsletter").html("Please fill in all required fields");
  }
});
