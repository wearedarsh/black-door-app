import axios from 'axios'


export default UtilsPushNotification = {
    sendPushNotification: async function(payload){
        const { expoPushToken, title, body, data = null } = payload
        try {
            const response = await axios.post(
              'https://exp.host/--/api/v2/push/send',
              {
                to: expoPushToken,
                title: title,
                body: body,
                sound: 'default',
                data: data && data
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