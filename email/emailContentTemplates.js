import { colors } from '../assets/style/theme'
export const systemEmailContentTemplates = {
    invite: `
    <p>Hi %firstName%,</p>
    <p>Here is your VIP access code for the BLKDR Super prime property app.</p>
    <p style="font-size:48px;color:${colors.gold}">%inviteCode%</p>
    `
}