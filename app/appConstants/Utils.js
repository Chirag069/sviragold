import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 411.42857142857144;
const guidelineBaseHeight = 774.8571428571429;

const sc = (size) => (width / guidelineBaseWidth) * size;
const vsc = (size) => (height / guidelineBaseHeight) * size;
const msc = (size, factor = 0.5) => size + (sc(size) - size) * factor;

export { sc, vsc, msc };
