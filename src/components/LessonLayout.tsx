import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import BackgroundLayout from "./BackgroundLayout";
import { Box, HStack, Image } from "native-base";
import CloseBtn from "./CloseBtn";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {
	iconSource: string;
	children: ReactNode;
	handleBack?: () => void;
};

const LessonLayout = (props: Props) => {
	const navigation = useNavigation();
	const { handleBack = () => navigation.goBack() } = props;
	return (
		<BackgroundLayout imageSource={props.iconSource || require("../../assets/images/bg-2.png")}>
			<Box
				flex={1}
				py={8}
				flexDir={"row"}
				style={{
					gap: 28,
					marginRight: 64,
				}}
			>
				<Image source={require("../../assets/images/phep-nhan-chia 1.png")} />
				<HStack flex={1}>
					<Box
						height="100%"
						width="100%"
					>
						<Box
							px={14 / 4}
							py={2}
							backgroundColor={"primary.600"}
							mb={3}
							borderRadius={16}
							flexDirection={"row"}
							justifyContent={"space-between"}
							alignItems={"center"}
						>
							<Box
								flexDir={"row"}
								style={{ gap: 8 }}
								py={2}
							>
								<Box style={styles.dots}></Box>
								<Box style={styles.dots}></Box>
								<Box style={styles.dots}></Box>
							</Box>
							<TouchableOpacity onPress={handleBack}>
								<AntDesign
									name="close"
									size={32}
									color="black"
								/>
							</TouchableOpacity>
						</Box>
						<BackgroundLayout
							backgroundColor={"white"}
							borderWidth={1.5}
							borderRadius={16}
						>
							{props.children}
						</BackgroundLayout>
					</Box>
				</HStack>
			</Box>
		</BackgroundLayout>
	);
};

export default LessonLayout;

const styles = StyleSheet.create({
	image: {
		height: 250,
	},
	dots: {
		width: 16,
		height: 16,
		borderWidth: 1,
		backgroundColor: "white",
		borderRadius: 999,
	},
});
