import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Center, HStack, Image, Text, VStack, useTheme } from "native-base";
import BackgroundLayout from "../components/BackgroundLayout";
import CustomBtn from "../components/CustomBtn";
import PopupParent from "../components/PopupParent";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScreenNavigationProps } from "../navigations/config";
import { Audio } from "expo-av";
import { loadSound } from "../utils/func";
import { EOperation } from "../types/utils";
import { useDispatch } from "react-redux";
import { removeLoading, setLoading } from "@/store/loading.reducer";
import AntDesign from "@expo/vector-icons/AntDesign";
type Props = {};

const Home = (props: Props) => {
	const { colors } = useTheme();
	const navigation = useNavigation<ScreenNavigationProps>();
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();

	const navigateLessonsScreen = async () => {
		navigation.navigate("Lessons");
	};
	const navigateCountScreen = async () => {
		navigation.navigate("QuizImage");
	};
	const navigateAddScreen = async () => {
		navigation.navigate("Quiz", {
			operation: EOperation.AddOperation,
		});
	};
	const navigateSubtractScreen = async () => {
		navigation.navigate("Quiz", {
			operation: EOperation.SubtractOperation,
		});
	};

	useFocusEffect(() => {
		const playSound = new Audio.Sound();
		loadSound(playSound, require("../../assets/sound/music.mp3"));
		const unsubscribe = async () => {
			await playSound.stopAsync();
		};

		return () => unsubscribe();
	});
	return (
		<BackgroundLayout imageSource={require("../../assets/images/bg-1.jpg")}>
			{/* Popup */}
			<PopupParent
				showModal={showModal}
				setShowModal={setShowModal}
			/>
			<Box
				flex={1}
				justifyContent={"center"}
				mr={"10%"}
				width={"65%"}
				alignSelf={"flex-end"}
			>
				<Box
					width={"50%"}
					alignSelf={"center"}
				>
					<Image
						source={require("../../assets/images/logo.png")}
						width={"100%"}
						style={{
							objectFit: "contain",
						}}
						height={60}
					/>
				</Box>
				<VStack
					space={12}
					flexDirection={"row"}
					flexWrap={"wrap"}
					justifyContent={"flex-end"}
				>
					<CustomBtn
						btnColor={colors.gradient.primary}
						text="Bài giảng"
						size="MD"
						handleBtn={navigateLessonsScreen}
					/>
					<CustomBtn
						btnColor={colors.gradient.primary}
						text="Đếm số"
						size="MD"
						handleBtn={navigateCountScreen}
					/>
					<CustomBtn
						btnColor={colors.gradient.primary}
						text="Trắc nghiệm phép cộng"
						size="MD"
						handleBtn={navigateAddScreen}
					/>
					<CustomBtn
						btnColor={colors.gradient.primary}
						text="Trắc nghiệm phép trừ"
						size="MD"
						handleBtn={navigateSubtractScreen}
					/>
				</VStack>
				<Box alignSelf={"center"}>
					<Text
						mt={6}
						color="#525252"
						fontSize={14}
					>
						Lựa chọn các chủ đề bài học
					</Text>
				</Box>
				<Box alignSelf={"center"}>
					<TouchableOpacity
						style={{
							flexDirection: "row",
							gap: 4,
							alignItems: "center",
							marginTop: 36,
						}}
						onPress={() => setShowModal(true)}
					>
						<Text
							style={{
								textDecorationLine: "underline",
								fontSize: 14,
								fontWeight: "500",
							}}
						>
							Dành cho phụ huynh
						</Text>
						<AntDesign
							name="arrowright"
							size={16}
							color="black"
						/>
					</TouchableOpacity>
				</Box>
			</Box>
		</BackgroundLayout>
	);
};

export default Home;

const styles = StyleSheet.create({});
