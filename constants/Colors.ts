/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Constant colors that follows the Cucko Manual Document.
// #000000 #183542 #0B818F #139FAA #49BCCE #B3E1E4 #F07122

const textColorLight = '#000000';
const backgroundColorLight = '#fff';
const tintColorLight = '#0B818F';
const iconColorLight = '#183542';
const tabIconDefaultColorLight = '#139FAA';
const tabIconSelectedColorLight = '#F07122';


const textColorDark = '#ECEDEE';
const backgroundColorDark = '#151718';
const tintColorDark = '#0B818F';
const iconColorDark = '#9BA1A6';
const tabIconDefaultColorDark = '#9BA1A6';
const tabIconSelectedColorDark = '#F07122';

export const Colors = {
  light: {
    text: textColorLight,
    background: backgroundColorLight,
    tint: tintColorLight,
    icon: iconColorLight,
    tabIconDefault: tabIconDefaultColorLight,
    tabIconSelected: tabIconSelectedColorLight,
  },
  dark: {
    text: textColorDark,
    background: backgroundColorDark,
    tint: tintColorDark,
    icon: iconColorDark,
    tabIconDefault: tabIconDefaultColorDark,
    tabIconSelected: tabIconSelectedColorDark,
  },
};
