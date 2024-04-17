import { brand, colors } from '../assets/style/theme'

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

    p {
      font-family: sans-serif;
      font-size: 16px;
      padding: 0;
    }

    .cta-button {
      padding: 8px 16px;
      color: ${colors.white};
      font-size: 16px;
      font-weight: bold;
      font-family: sans-serif;
      background-color: ${colors.gold};
      text-align:center;
      border-radius: 8px;
      text-decoration: none;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 48px 16px;
      background-color: ${colors.slate};
    }

    .logo {
      margin-bottom: 16px;
      text-align: center;
    }

    .logo img {
      width: 200px;
    }

    .content-panel {
      border-radius: 8px;
      padding: 16px;
    }

    .code-content-panel {
      background-color: #343232;
      border-radius: 8px;
      padding: 12px;
      text-align: center;
    }

    .content-panel p {
      color: #ffffff;
      text-align: center;
    }

    .small {
      font-size: 12px;
    }

    #code-number-holder {
      background-color: ${colors.slate};
      border-radius: 8px;
      text-align: center;
      max-width: 200px;
      margin: 0 auto;
    }

    #code-content-p {
      font-size: 40px;
      color: #AF9A63;
      padding:8px;
      line-height: 40px;
      margin:0;
    }

    .footer {
      margin-top: 32px;
      text-align: center;
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
      <img src="${brand.brandAssetDomain}/email/img/email-header-logo@2x.png?=v2" alt="BLKDR vip logo" width="250">
    </div>
    <div class="content-panel">
      %emailContent%
    </div>
    <div class="footer">
      <p>${brand.emailFooterStrapline}</p>
    </div>
  </div>
</body>
</html>`
