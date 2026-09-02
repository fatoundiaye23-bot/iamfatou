/*
 ** NEWSLETTER
 */
function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test($email);
}

function hideSubscribeSuccess() {
  $("#subscribe-success-overlay").removeClass("is_visible");
}

function showSubscribeSuccess($form) {
  var title = $form.data("success-title") || "Thank you for subscribing!";
  var text = $form.data("success-text") || "We'll be in touch soon.";
  var $overlay = $("#subscribe-success-overlay");
  if ($overlay.length === 0) {
    $overlay = $(
      '<div id="subscribe-success-overlay" class="subscribe_success_overlay">' +
        '<div class="subscribe_success_card">' +
        '<button type="button" class="subscribe_success_close" aria-label="Close">&times;</button>' +
        '<div class="subscribe_success_icon"><svg viewBox="0 0 24 24" width="26" height="26"><path fill="none" stroke="#efe6dd" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M4 12.5l5 5 11-11"/></svg></div>' +
        "<h3></h3>" +
        "<p></p>" +
        "</div>" +
        "</div>"
    );
    $("body").append($overlay);
    $overlay.on("click", function (e) {
      if (e.target === this) hideSubscribeSuccess();
    });
    $overlay.find(".subscribe_success_close").on("click", hideSubscribeSuccess);
  }
  $overlay.find("h3").text(title);
  $overlay.find("p").text(text);
  $overlay.addClass("is_visible");
  clearTimeout(window._subscribeSuccessTimeout);
  window._subscribeSuccessTimeout = setTimeout(hideSubscribeSuccess, 7000);
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
  $("#msg-newsletter").html("");
  showSubscribeSuccess($form);
});
