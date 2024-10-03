import { Alert, StyleSheet, TouchableOpacity, Button } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import LessonLayout from "../components/LessonLayout";
import { Box, Text, HStack, VStack, useTheme } from "native-base";
import { ArrowLeft3, ArrowRight3 } from "iconsax-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { EFont, ELessonType } from "../types/utils";
import CustomBtn from "../components/CustomBtn";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProps } from "../navigations/config";
import { lessons } from "../data/mockup";
import YoutubePlayer from "react-native-youtube-iframe";
import ArrowRight from "@/components/icons/ArrowRight";
import ArrowLeft from "@/components/icons/ArrowLeft";
import { Path, Svg } from "react-native-svg";

type Props = {};

const activeButtonColor = "#000";
const inactiveButtonColor = "#cecece";

const Tick = () => {
	const { colors } = useTheme();
	return (
		<Svg
			width={16}
			height={16}
			fill="none"
		>
			<Path
				fill="#FFAD00"
				d="M8 1.5A6.507 6.507 0 0 0 1.5 8c0 3.584 2.916 6.5 6.5 6.5s6.5-2.916 6.5-6.5S11.584 1.5 8 1.5Zm3.383 4.322-4.2 5a.501.501 0 0 1-.375.178h-.009a.5.5 0 0 1-.371-.166l-1.8-2a.5.5 0 1 1 .743-.668l1.415 1.572 3.831-4.56a.5.5 0 0 1 .766.644Z"
			/>
		</Svg>
	);
};
const Lessons = (props: Props) => {
	const navigation = useNavigation<ScreenNavigationProps>();
	// const route = useRoute();
	const { colors } = useTheme();
	const video = useRef(null);
	const [status, setStatus] = useState({});
	const [lessonIdx, setLessonIdx] = useState(0);

	const [playing, setPlaying] = useState(false);
	const [playerSize, setPlayerSize] = useState({ width: 0, height: 0 });

	const onStateChange = useCallback((state: string) => {
		if (state === "ended") {
			setPlaying(false);
			Alert.alert("Video has finished playing!");
		}
	}, []);

	const navigateExamScreen = () => {
		const lessonType = lessons[lessonIdx].type;
		if (lessonType == ELessonType.OBJECTIVE_TEST) {
			navigation.navigate("ObjectiveTest", {
				idx: lessonIdx,
				operation: "+",
			});
		} else if (lessonType == ELessonType.PICK_NUMBER) {
			navigation.navigate("Examination", {
				idx: lessonIdx,
			});
		}
	};

	return (
		<LessonLayout iconSource={require("../../assets/images/bg-3.jpg")}>
			<Box flex={1}>
				<VStack
					flex={1}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<HStack
						flex={1}
						alignItems={"center"}
						mx={7}
						space={3}
					>
						<TouchableOpacity
							onPress={() => {
								console.log(lessonIdx === 0 ? inactiveButtonColor : activeButtonColor);
								if (lessonIdx === 0) return;
								setLessonIdx((lessonIdx - 1 + Object.keys(lessons).length) % Object.keys(lessons).length);
							}}
						>
							<ArrowLeft color={lessonIdx === 0 ? inactiveButtonColor : activeButtonColor} />
						</TouchableOpacity>
						<Box
							flex={1}
							borderRadius={12}
							alignItems={"center"}
							overflow={"hidden"}
							px={2}
							height={"100%"}
							mt={4}
							onLayout={(e) => {
								console.log("onLayout", e.nativeEvent.layout);
								setPlayerSize({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height });
							}}
						>
							<YoutubePlayer
								height={playerSize.height}
								width={playerSize.width}
								webViewStyle={{
									width: "100%",
									height: playerSize.height,
								}}
								play={playing}
								videoId={lessons[lessonIdx].video}
								onChangeState={onStateChange}
							/>
						</Box>
						<TouchableOpacity
							onPress={() => {
								if (lessonIdx === Object.keys(lessons).length - 1) return;
								setLessonIdx((lessonIdx + 1) % Object.keys(lessons).length);
							}}
						>
							<ArrowRight color={lessonIdx === Object.keys(lessons).length - 1 ? inactiveButtonColor : activeButtonColor} />
						</TouchableOpacity>
					</HStack>
					<HStack
						mt={1}
						mx={6}
						justifyContent={"space-between"}
						alignItems={"center"}
					>
						<VStack>
							<Text
								fontFamily={EFont.Quicksand_700Bold}
								color="black"
								fontSize={24}
								fontWeight={"700"}
							>
								Bài {lessonIdx + 1}:
							</Text>
							<HStack
								alignItems={"center"}
								space={1}
							>
								<Box maxW={50}>
									<Text
										fontFamily={EFont.Quicksand_700Bold}
										color="black"
										fontWeight={"700"}
										fontSize={16}
										ellipsizeMode="tail"
										numberOfLines={2}
									>
										{lessons[lessonIdx].title}
									</Text>
								</Box>
								<Tick />
							</HStack>
						</VStack>
						<CustomBtn
							btnColor={colors.gradient.secondary.orange}
							size="SM"
							text="Bài kiểm tra"
							handleBtn={navigateExamScreen}
							disabled={lessons[lessonIdx].exams.length <= 0}
						/>
					</HStack>
				</VStack>
			</Box>
		</LessonLayout>
	);
};

export default Lessons;

const styles = StyleSheet.create({});
