import axios from 'axios'


export default UtilsPushNotification = {
    sendPushNotification: async function(payload){
        const { expoPushToken, subtitle, title, body, data, categoryId } = payload
        try {
            const response = await axios.post(
              'https://exp.host/--/api/v2/push/send',
              {
                to: expoPushToken,
                title,
                subtitle,
                body,
                sound: 'default',
                data,
                categoryId
              }
            )
            if(response.status === 200){
                return { sucess: true, message: 'Notification sent succesfully'}
            }else{
                return { success: false, message: 'Failed to send notification: ' + response.status}
            }
          }catch(error) {
            return { success: false, message: error.message}
          }
    }
}