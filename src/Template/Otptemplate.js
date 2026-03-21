export const otptemplate = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Your OTP Code</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f9; font-family: Arial, sans-serif;">

<table align="center" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<!-- Main Container -->
<table width="450" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; box-shadow:0 8px 20px rgba(0,0,0,0.08); overflow:hidden;">

<!-- Header -->
<tr>
<td align="center" style="background:linear-gradient(135deg,#4f46e5,#7c3aed); padding:30px;">
<h2 style="color:#ffffff; margin:0;">Verification Code</h2>
</td>
</tr>

<!-- Body -->
<tr>
<td align="center" style="padding:40px 30px; color:#333333;">

<p style="font-size:16px; margin:0 0 15px;">Hello,</p>

<p style="font-size:15px; margin:0 0 25px;">
Use the following One-Time Password (OTP) to complete your verification process.
</p>

<!-- OTP Box -->
<div style="font-size:32px; letter-spacing:8px; font-weight:bold; 
background:#f3f4f6; padding:18px 25px; 
border-radius:8px; display:inline-block; color:#4f46e5;">
{otp}
</div>

<p style="font-size:13px; color:#666; margin-top:25px;">
This OTP is valid for <strong>10 minutes</strong>.  
Do not share this code with anyone.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td align="center" style="background:#f9fafb; padding:20px; font-size:12px; color:#888;">
If you did not request this code, please ignore this email.
<br><br>
© 2026 Your Company Name. All rights reserved.
</td>
</tr>

</table>
<!-- End Container -->

</td>
</tr>
</table>

</body>
</html>
`