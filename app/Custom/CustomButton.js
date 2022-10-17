import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const CustomButton = ({
  text,
  buttonwidth,
  buttoncolor,
  borderradius,
  buttonheight,
  fontSize,
  fontcolor,
  onPress,
  borderWidth,
  borderColor
}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
      style={{
        borderWidth:borderWidth,
        borderColor:borderColor,
        backgroundColor: buttoncolor,
        width: buttonwidth,
        height: buttonheight,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderradius,
      }}>
      <Text style={{fontSize: fontSize, color: fontcolor}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
