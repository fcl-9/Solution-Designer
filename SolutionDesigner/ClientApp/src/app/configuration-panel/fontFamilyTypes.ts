import { FontFamily } from "../fontfamily";

const fontGroups: Array<FontFamily> = [
  {
    name: "Serif Fonts",
    fonts: [
      {
        value: "Georgia, serif"
      },
      {
        value: "\"Palatino Linotype\", \"Book Antiqua\", Palatino, serif"
      },
      {
        value: "\"Times New Roman\", Times, serif"
      }
    ]
  },
  {
    name: "Sans-Serif Fonts",
    fonts: [
      {
        value: "Arial, Helvetica, sans-serif"
      },
      {
        value: "\"Arial Black\", Gadget, sans-serif"
      },
      {
        value: "\"Comic Sans MS\", cursive, sans-serif"
      },
      {
        value: "Impact, Charcoal, sans-serif"
      },
      {
        value: "\"Lucida Sans Unicode\", \"Lucida Grande\", sans-serif"
      },
      {
        value: "Tahoma, Geneva, sans-serif"
      },
      {
        value: "\"Trebuchet MS\", Helvetica, sans-serif"
      },
      {
        value: "Verdana, Geneva, sans-serif"
      }
    ]
  },
  {
    name: "Monospace Fonts",
    fonts: [
      {
        value: "\"Courier New\", Courier, monospace"
      },
      {
        value: "\"Lucida Console\", Monaco, monospace"
      }
    ]
  }
];

export default fontGroups;
