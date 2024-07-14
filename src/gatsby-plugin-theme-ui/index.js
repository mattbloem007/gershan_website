import defaultColors from "../data/theme/colors.json"
import fonts from '../data/theme/fonts.json'

const theme = {
  colors: {
    ...defaultColors,
    headings: "rgba(0, 0, 0, 0.6)",
    text: "#000",
    background: "#000000",
    primary: "#1D4127",
    accent: "#fff",
    muted: "rgba(0, 0, 0, 0.7)",
    cardBg: "#fff",
    borderColor: "#fff",
    labelText: "#000",
    inputBorder: "#aaa",
  },
  fonts:{
    ...fonts,
  },
  links: {
    postLink: {
      color: "muted",
      "&:hover": {
        color: "text",
      },
    },
  },
  variants: {
    button: {
      bg: "siteColor",
      color: "buttonColor",
      "&:hover": {
        bg: "buttonHoverBg",
        color: "buttonHoverColor",
      },
    },
    socialIcons: {
      a: {
        color: "socialIcons",
        ":hover": {
          color: "socialIconsHover",
        },
      },
    },
  },
}

export default theme
