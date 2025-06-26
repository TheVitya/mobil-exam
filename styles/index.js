import { StyleSheet } from "react-native"

export const sharedStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
    marginBottom: 16,
  },
  headerRowStart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  // Text
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    flex: 1,
    marginRight: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  boldText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
  },
  value: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "400",
  },
  label: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 2,
  },
  smallText: {
    fontSize: 12,
    color: "#6b7280",
  },
  link: {
    fontSize: 14,
    color: "#3b82f6",
    marginBottom: 2,
  },

  // Input
  textInput: {
    height: 40,
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },

  // Badges
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#ffffff",
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
    marginBottom: 16,
  },
  gridItem: {
    width: "50%",
    paddingVertical: 8,
  },

  // Sections
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },

  // Grouped Info Box
  infoBox: {
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  infoValueLarge: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
})

