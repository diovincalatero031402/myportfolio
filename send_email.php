<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/vendor/phpmailer/phpmailer/src/Exception.php';
require 'phpmailer/vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'phpmailer/vendor/phpmailer/phpmailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = $_POST['name'];
    $email   = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';  // Your SMTP server (like smtp.gmail.com)
        $mail->SMTPAuth   = true;
        $mail->Username   = 'diovincalatero150@gmail.com';   // Your email
        $mail->Password   = 'lgsn qlgh bjeu ybzo';     // Your email password or App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
        $mail->Port       = 587;

        //Recipients
        $mail->setFrom($email, $name);
        $mail->addAddress('diovincalatero150@gmail.com', 'Diovin Calatero');  // Where the message will be sent

        //Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = "<strong>Name:</strong> $name<br>
                          <strong>Email:</strong> $email<br>
                          <strong>Message:</strong><br>" . nl2br($message);

        $mail->send();
        header("Location: index.html?status=success&message=Email sent successfully");
        exit();
    } catch (Exception $e) {
        $errorMsg = urlencode("Mailer Error: " . $mail->ErrorInfo);
        header("Location: index.html?status=error&message=$errorMsg");
        exit();
    }
}
?>
