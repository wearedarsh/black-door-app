import { colors, brand } from '../assets/style/theme'
export const systemEmailContentTemplates = {
    invite: `
    <p><strong>Hi %firstName%,</strong></p>
    <p>You have been granted exclusive access to the BLKDR vip app.</p>
    <div class="code-content-panel">
        <p><strong>Here is your vip access code</strong></p>
        <div id="code-number-holder"><p id="code-content-p">%inviteCode%</p></div>
        <p class="small">This code expires in 48 hrs</p>
      </div>
      <p><strong>Download the app</strong></p>
      <div id="download-holder" style="text-align: center;">
        <a href="${brand.iosAppDownloadURL}"><img src="${brand.brandAssetDomain}/email/img/download-ios@2x.png?=v1" alt="Download iOS" width="124"></a>
        <a href="${brand.androidAppDownloadURL}"><img src="${brand.brandAssetDomain}/email/img/download-android@2x.png?=v1" alt="Download android" width="111"></a>
      </div>
    `,
    newCode: `
    <p>Hi %firstName%,</p>
    <p>Here is your new VIP access code for the BLKDR Super prime property app.</p>
    <p>This will expire in 48 hours.</p>
    <p style="font-size:48px;color:${colors.gold}">%inviteCode%</p>
    `,
}