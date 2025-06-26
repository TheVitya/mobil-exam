import { StyleSheet } from "react-native"

export const lightColors = {
  primary: "#6366f1",
  backgroundColor: "#f8fafc",
  cardColor: "#f9fafb",
  textColor: "#1f2937",
  textColorSecondary: "#6b7280",
  textColorTertiary: "#ffffff",
};

export const darkColors = {
  primary: "#6366f1",
  backgroundColor: "#18181b",
  cardColor: "#27272a",
  textColor: "#f3f4f6",
  textColorSecondary: "#a1a1aa",
  textColorTertiary: "#18181b",
};

export const SPACING_UNIT = 8;
export const FONT_SIZE_UNIT = 14;

export const createSharedStyles = (colors) => StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  list: {
    padding: SPACING_UNIT * 2.5,
  },
  card: {
    backgroundColor: colors.cardColor,
    borderRadius: SPACING_UNIT * 1.5,
    padding: SPACING_UNIT * 2,
    marginBottom: SPACING_UNIT * 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING_UNIT * 2,
  },
  headerColumn: {
    flex: 1,
    marginBottom: SPACING_UNIT * 2,
  },
  headerRowStart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING_UNIT * 1.5,
  },

  // Text
  title: {
    fontSize: FONT_SIZE_UNIT * 1.2857,
    fontWeight: "bold",
    color: colors.textColor,
  },
  name: {
    fontSize: FONT_SIZE_UNIT * 1.1429,
    fontWeight: "600",
    color: colors.textColor,
    flex: 1,
    marginRight: SPACING_UNIT,
  },
  subtitle: {
    fontSize: FONT_SIZE_UNIT,
    color: colors.textColorSecondary,
  },
  boldText: {
    fontSize: FONT_SIZE_UNIT,
    fontWeight: "500",
    color: colors.textColor,
  },
  value: {
    fontSize: FONT_SIZE_UNIT,
    color: colors.textColor,
    fontWeight: "400",
  },
  label: {
    fontSize: FONT_SIZE_UNIT,
    color: colors.textColorSecondary,
    marginBottom: SPACING_UNIT * 0.25,
  },
  smallText: {
    fontSize: FONT_SIZE_UNIT * 0.8571,
    color: colors.textColorSecondary,
  },
  link: {
    fontSize: FONT_SIZE_UNIT,
    color: colors.primary,
    marginBottom: SPACING_UNIT * 0.25,
  },

  // Input
  textInput: {
    height: 40,
    borderColor: colors.textColorSecondary,
    borderWidth: 1,
    borderRadius: SPACING_UNIT,
    paddingHorizontal: SPACING_UNIT,
    backgroundColor: colors.backgroundColor,
  },

  // Badges
  badge: {
    paddingHorizontal: SPACING_UNIT * 1.5,
    paddingVertical: SPACING_UNIT * 0.75,
    borderRadius: SPACING_UNIT * 2,
  },
  badgeSmall: {
    paddingHorizontal: SPACING_UNIT,
    paddingVertical: SPACING_UNIT * 0.5,
    borderRadius: SPACING_UNIT * 1.5,
  },
  badgeText: {
    fontSize: FONT_SIZE_UNIT * 0.8571,
    fontWeight: "500",
    color: colors.textColorTertiary,
    textAlign: "center",
    textTransform: "capitalize",
  },

  // Grid & Rows
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: SPACING_UNIT * 2,
  },
  gridColumn: {
    flex: 1,
    marginBottom: SPACING_UNIT * 2,
  },
  gridItem: {
    width: "50%",
    paddingVertical: SPACING_UNIT,
  },

  // Sections
  section: {
    marginBottom: SPACING_UNIT * 2,
  },
  sectionTitle: {
    fontSize: FONT_SIZE_UNIT * 1.1429,
    fontWeight: "600",
    color: colors.textColor,
    marginBottom: SPACING_UNIT,
  },

  // Grouped Info Box
  infoBox: {
    backgroundColor: colors.cardColor,
    borderRadius: SPACING_UNIT,
    padding: SPACING_UNIT * 1.5,
    marginBottom: SPACING_UNIT * 2,
  },
  infoValueLarge: {
    fontSize: FONT_SIZE_UNIT * 1.2857,
    fontWeight: "bold",
    color: colors.textColor,
    marginBottom: SPACING_UNIT * 0.25,
  },

  button: {
    paddingHorizontal: SPACING_UNIT * 3,
    paddingVertical: SPACING_UNIT * 1.5,
    backgroundColor: colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: FONT_SIZE_UNIT * 1.1429,
    textAlign: "center",
    fontWeight: "600",
    color: colors.textColorTertiary,
  },
});

