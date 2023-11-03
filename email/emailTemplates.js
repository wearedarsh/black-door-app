export const systemEmailHTMLTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BLKDR VIP Email</title>
  <style>
    /* Email Styles */
    body {
      background-color: #231F20;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 48px 16px;
    }

    .logo {
      margin-bottom: 32px;
      text-align: center;
    }

    .logo img {
      width: 200px;
    }

    .content-panel {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 16px;
    }

    .content-panel p {
      text-align: center;
      font-size: 24px;
    }

    .footer {
      margin-top: 32px;
      text-align: center;
    }

    .footer .heart {
      font-size: 24px;
    }

    .footer p {
      font-size: 8px;
      color: #999999;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <img src="https://www.wearedarsh.com/blkdr/email/img/BLKDR-email-logo@2x.png?=v1" alt="BLKDR VIP" width="250">
    </div>
    <div class="content-panel">
      %emailContent%
    </div>
    <div class="footer">
      <p class="heart"></p>
      <p>Sent from the BLKDR app.</p>
    </div>
  </div>
</body>
</html>`
