const TYPE_FONT_FAMILY_MAPPING = {
  normal: "Roboto-Regular",
  medium: "Roboto-Medium",
  bold: "Roboto-Bold",
};

export default function fonts(size: number, type: "normal" | "medium" | "bold" = "normal") {
  let fontFamily = TYPE_FONT_FAMILY_MAPPING[type];

  return {
    fontSize: size,
    fontFamily,
  };
}
