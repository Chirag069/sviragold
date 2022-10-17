import React from "react";
import { TouchableNativeFeedback, View } from "react-native";
import { List } from "react-native-paper";
import { ListItemSeasons, styles } from "../AllSeasons.Style.js";

import { colors } from "../../../theme/colors.js";

const SeasonsItem = ({
  item,
  textColor,
  themeBackgroundColor,
  isDarkTheme,
}) => (
  <View style={isDarkTheme ? styles.DarkSectionItem : styles.sectionItem}>
    <ListItemSeasons
      background={TouchableNativeFeedback.Ripple(
        isDarkTheme ? colors.text.darkGrey : colors.brand.primary
      )}
      onPress={() => {}}
      textColor={textColor}
      bgColor={themeBackgroundColor}
      title={item}
      right={(props) => (
        <List.Icon
          {...props}
          color={isDarkTheme ? "#3A3A3A" : "#000000"}
          icon="chevron-right"
        />
      )}
    />
  </View>
);

export default SeasonsItem;
