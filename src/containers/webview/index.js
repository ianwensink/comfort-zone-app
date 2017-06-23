import { Actions } from 'react-native-router-flux';

function onMessage(event) {
  let message = false;
  try {
    message = JSON.parse(event.nativeEvent.data);
  } catch(e) {}

  if(!message || !message.action) {
    return;
  }

  switch(message.action) {
    case 'goTo':
    default:
      if(Actions[message.page] && typeof Actions[message.page] === 'function') {
        Actions[message.page](message.data);
      } else if(!message.page) {
        throw new Error('Please send a \'page\' property with your dispatch containing the key of the page to navigate to');
      } else {
        console.warn('Tried to navigate to', message.page, 'but this action doesn\'t exist.');
      }
  }
}

export { onMessage }
