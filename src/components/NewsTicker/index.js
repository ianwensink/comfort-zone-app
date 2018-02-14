import React from 'react';
import { View, Text } from 'react-native';
import CustomText from "../ui/Text";

const NewsTicker = ({ items }) => {
  return (
    <View>
      {items.map((item, i) => <Text key={i}>{item}</Text>)}
    </View>
  );
};

export default NewsTicker;
