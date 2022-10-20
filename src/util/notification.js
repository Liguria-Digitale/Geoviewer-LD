import { Notification } from 'element-ui';

export default function notification(message, type = 'info', duration = 5000) {
  const title = type === 'info' ? 'Info' : 'Attenzione!!!';

  if (message && type) {
    Notification({
      title: title,
      type: type,
      duration: duration,
      //duration: 0,
      offset: 70,
      dangerouslyUseHTMLString: true,
      position: 'bottom-left',
      message: message,
    });
  }
}
