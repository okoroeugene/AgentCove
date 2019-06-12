import React from "react";
import {
	StyleSheet,
	Dimensions
} from "react-native";

export default StyleSheet.create({
	pageLayout: {
		alignItems: "stretch",
		flex: 1
	},
	inputFormStyle: {
		fontFamily: 'Sofia Pro Regular',
		fontSize: 16
	},
	backgroundImageWrapper: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%"
	},
	defaultFont: {
		fontFamily: 'Sofia Pro Regular',
		fontSize: 16
	},
	placeholder: {
		fontFamily: 'Sofia Pro Regular',
		fontSize: 18,
		color: "#afafaf"
	},
	defaultGrayTextColor: {
		color: "#B0B1AD"
	},
	placeholderError: {
		fontFamily: 'OpenSans-Regular',
		fontSize: 14,
		color: "#f12828"
	},
	container: {
		flex: 1,
		padding: 40,
		// flexDirection: "column",
		justifyContent: "center",
		backgroundColor: "#EBEDEC"
		// paddingTop: 200
	},
	modalContainer: {
		flex: 1,
		// alignItems: 'center',
		padding: 100,
		borderRadius: 5,
		justifyContent: 'center',
		backgroundColor: '#ecf0f1',
	},
	button: {
		paddingTop: 20
	},
	backgroundImage: {
		resizeMode: "cover",
		flex: 1,
		width: null,
		height: null
	},
	containerStyle: {
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 1,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
		padding: 40
	},
	fullContainer: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#EBEDEC"
	},
	serviceBtn: {
		// width: 70,
		// height: 70,
		width: 100,
		height: 100,
		borderRadius: 100 / 2,
		justifyContent: "center"
	},
	step: {
		width: 40,
		height: 40,
		borderRadius: 40 / 2,
		justifyContent: "center",
		// backgroundColor: "#bbb",
		alignItems: "center",
		margin: 10
	},
	imgOverlay: {
		position: 'absolute',
		// left: 33,
		fontSize: 25,
		color: "red",
		width: 25,
		height: 25,
		borderRadius: 25 / 2,
		backgroundColor: "white",
		paddingLeft: 2.2,
		paddingBottom: 1.8,
		alignSelf: "center"
	},
	textWhite: {
		color: "white"
	},
});
