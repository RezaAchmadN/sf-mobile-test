import { StyleSheet, Dimensions, StatusBar } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const Styles = StyleSheet.create({
  root: {
    height: windowHeight,
    width: windowWidth,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#F2F2F2",
  },
  movieLayout: {
    paddingHorizontal: 16,
    paddingBottom: 100
  },
  movieBox: {
    borderRadius: 8,
    backgroundColor: "white",
    marginVertical: 8,
    paddingRight: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: windowWidth,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    flexShrink: 1,
    flexWrap: "wrap",
    textAlign: "center",
    paddingHorizontal: 8,
    fontWeight: "bold",
  },
  imageAtList: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: 100,
    height: 100,
  },
  iconOn: {
    color: "blue",
    opacity: 1
  },
  iconOff: {
    color: "black",
    opacity: 0.3
  },
  navContainer: {
    position:  "absolute",
    alignItems: "center",
    bottom: 30,
  },
  navBar: {
    flexDirection: "row",
    backgroundColor: "black",
    width: '90%',
    justifyContent: "space-evenly",
    borderRadius: 40,
    padding: 16
  },
  iconNavBar: {
    color: "white",
  },
  center: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
});