import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

const ArrowRight = ({ color, ...props }: SvgProps & { color?: string }) => {
	return (
		<Svg
			width={21}
			height={24}
			fill="none"
			{...props}
		>
			<Path
				fill={color || "#262626"}
				d="M19.5 9.402c2 1.155 2 4.041 0 5.196l-15 8.66C2.5 24.413 0 22.97 0 20.66V3.34C0 1.03 2.5-.413 4.5.742l15 8.66Z"
			/>
		</Svg>
	);
};

export default ArrowRight;
