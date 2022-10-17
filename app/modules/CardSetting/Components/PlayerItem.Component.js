import React from "react";
import { TouchableNativeFeedback, Image } from "react-native";
import { colors } from "../../../theme/colors.js";
import {
  ListItemContainer,
  PlayerListItem,
  ViewConatiner,
  styles,
} from "../Players.Style.js";

import { sc, vsc, msc } from "../../../appConstants/Utils";

const PlayerItem = ({ item, textColor, themeBackgroundColor, isDarkTheme }) => (
  <ListItemContainer>
    <PlayerListItem
      background={TouchableNativeFeedback.Ripple(
        isDarkTheme ? colors.text.darkGrey : colors.brand.primary
      )}
      isDarkTheme={isDarkTheme}
      onPress={() => null}
      textColor={textColor}
      bgColor={themeBackgroundColor}
      title={item.title}
      description={item.info}
      left={(props) => (
        <ViewConatiner>
          <Image
            style={styles.imageStyle}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVkMl37FZ71H4v6eQpYSiolsf7nBke68tySw&usqp=CAU",
            }}
          />
        </ViewConatiner>
      )}
    />
  </ListItemContainer>
);

export default PlayerItem;
