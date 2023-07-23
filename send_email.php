<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $firstName = $_POST['firstName'];
  $lastName = $_POST['lastName'];
  $cell = $_POST['cell'];
  $email = $_POST['email'];
  $message = $_POST['message'];
  
  $to = 'greg.cleaver@gmail.com';  // Replace with your own email address
  $subject = 'New Contact Form Submission';
  $body = "Name: $firstName\n\n Last Name: $lastName\n\n Cell Number: $cell \n\n Email: $email\n\nMessage: $message";
  
  if (mail($to, $subject, $body)) {
    echo '<script>alert("Thank you for contacting us!");</script>';
  } else {
    echo '<script>alert("There was a problem sending the email.");</script>';
  }
}
?>
