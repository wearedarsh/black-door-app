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
    background-color: ${colors.secondary};/*{colors.secondary}#231F20*/
    margin: 0;
    padding: 0;
  }

  p {
    font-family: sans-serif;
    font-size: 16px;
    padding: 0;
  }

  .cta-button {
    padding: 8px 32px;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    font-family: sans-serif;
    background-color: ${colors.primary};/*{colors.primary}#AF9A63*/
    text-align:center;
    border-radius: 8px;
    text-decoration: none;
    width: 240px;

  }

  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 48px 16px;
    background-color: ${colors.secondary};/*{colors.secondary}#231F20*/
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
    background-color: ${colors.secondaryMedium};/*{colors.secondaryMedium}#343232*/
    border-radius: 8px;
    padding: 12px;
    text-align: center;
  }

  .content-panel p {
    color: ${colors.white};/*{colors.secondary-medium}#FFFFFF*/
    text-align: center;
  }

  .small {
    font-size: 12px;
  }

  #code-number-holder {
    background-color: ${colors.secondary};/*{colors.secondary}#231F20*/
    text-align: center;
    max-width: 200px;
    margin: 0 auto;
  }

  #code-content-p {
    font-size: 40px;
    color: ${colors.primary};/*{colors.primary}#AF9A63*/
    padding:8px;
    line-height: 40px;
    margin:0;
  }

  #heroImage {
      width:100%;
  }

  #cta-content {
      padding: 8px;
      background-color: ${colors.secondary};/*{colors.secondary}#231F20*/
      border-radius: 8px;
      margin-top:16px;
  }

  .icon {
      width: 28px;
      margin-right:8px;
  }

  .footer {
    margin-top: 32px;
    text-align: center;
  }

  .vMiddle {
      line-height: 28px;
      vertical-align: middle;
  }

  .footer p {
    font-size: 8px;
    color: ${colors.secondaryLight};/*{colors.secondaryLight}#999999*/
  }
  .half {
      max-width: 45%;
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
