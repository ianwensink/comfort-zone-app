function onMessage(event, navigation = false) {
  let message = false;
  try {
    message = JSON.parse(event.nativeEvent.data);
  } catch(e) {
  }

  if(!message || !message.action) {
    return;
  }

  switch(message.action) {
    case 'goTo':
    default:
      if(navigation) {
        navigation.navigate(message.page, message.data);
      }
  }
}

export { onMessage }
