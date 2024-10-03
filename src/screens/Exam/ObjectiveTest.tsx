import { StyleSheet } from "react-native";
import React, { memo, useEffect, useMemo, useState } from "react";
import LessonLayout from "../../components/LessonLayout";
import { Box, Center, HStack, Text, VStack, useTheme } from "native-base";
import { Image } from "expo-image";
import CustomBtn from "../../components/CustomBtn";
import PopupRightAnswer from "../../components/PopupRightAnswer";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import { lessons, quizAddAndSubtract } from "../../data/mockup";
import { loadSound, randomNumberToN } from "../../utils/func";
import { Audio } from "expo-av";
import Formula from "@/components/Formula";
import { EQuizStatus, IAnserTag } from "@/types/utils";
import GroupAnswer from "@/components/GroupAnswer";

type Props = {} & NativeStackScreenProps<RootStackParams, "ObjectiveTest">;

const NUM_QUESTIONS = 6;
const createRandomQuestions = (operation: string, length: number) => {
	let value = [];
	for (let i = 0; i < length; i++) {
		value.push(quizAddAndSubtract[operation].sort(() => 0.5 - Math.random()).slice(0, 5));
	}
	return value;
};

const randomQuestions = {
	"+": createRandomQuestions("+", NUM_QUESTIONS),
	"-": createRandomQuestions("-", NUM_QUESTIONS),
};

const createAnswerTags = (): IAnserTag[] => {
	return [null, null, null, null, null];
};

const ObjectiveTest = (props: Props) => {
	const { operation } = props.route.params;
	const questions = randomQuestions[operation as "+" | "-"];
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const currentQuestion = useMemo(() => {
		return questions[currentQuestionIndex];
	}, [currentQuestionIndex]);
	const { navigation, route } = props;
	const { idx } = route.params;
	const exams = lessons[idx].exams;
	const [randomNum] = useState(randomNumberToN(exams.length));
	const [listTest] = useState();
	const { colors } = useTheme();
	const [showModal, setShowModal] = useState(false);
	const [quesIndex, setQuesIndex] = useState(0);
	const [answerTag, setAnswerTag] = useState<IAnserTag[]>(createAnswerTags());
	const [infoModal, setInfoModal] = useState({
		status: false,
		title: "Yeah!",
		text: "Bạn đã trả lời đúng",
	});

	const handleModalBtn = () => {
		setShowModal(false);
		if (infoModal.status) {
			navigation.navigate("Collection");
		} else {
			navigation.navigate("Home");
		}
	};

	const handleBtn = (idx: number) => {
		const playSound = new Audio.Sound();
		if (idx == exams[randomNum].answer) {
			loadSound(playSound, require("../../../assets/sound/correct.mp3"));
			setInfoModal({
				title: "Yeah!",
				text: "Bạn đã trả lời đúng",
				status: true,
			});
		} else {
			loadSound(playSound, require("../../../assets/sound/wrong.mp3"));
			setInfoModal({
				title: "Oh no!",
				text: "Bạn trả lời chưa chính xác",
				status: false,
			});
		}
		setShowModal(true);
	};
	useEffect(() => {
		if (answerTag[currentQuestionIndex] && questions[currentQuestionIndex + 1]) {
			// handle if answer is right
			setCurrentQuestionIndex((currentQuestionIndex + 1 + questions.length) % questions.length);
		}
	}, [answerTag]);
	useEffect(() => {
		if (currentQuestionIndex === NUM_QUESTIONS - 1 && answerTag[NUM_QUESTIONS - 1]) {
			setShowModal(true);
		}
	}, [currentQuestionIndex, answerTag]);

	return (
		<LessonLayout iconSource={require("../../../assets/images/bg-2.jpg")}>
			<PopupRightAnswer
				showModal={showModal}
				setShowModal={setShowModal}
				handleBtn={handleModalBtn}
				title={infoModal.title}
				text={infoModal.text}
			/>
			<HStack
				mx={10}
				my={5}
				flex={1}
				flexShrink={1}
				space={4}
				// overflow={"hidden"}
				alignItems={"flex-start"}
				alignSelf={"flex-start"}
			>
				{/* 3 first items */}
				<VStack space={2}>
					{questions.map(
						(item, index) =>
							index < 3 && (
								<Formula
									size="S"
									data={item[quesIndex]}
									key={index}
									status={currentQuestionIndex == index ? EQuizStatus.ANSWER : EQuizStatus.HIDDEN}
									answerTag={answerTag[index]}
								/>
							)
					)}
				</VStack>
				<HStack
					opacity={0.24}
					background={"#262626"}
					width={0.5}
					height={"140%"}
				></HStack>
				<VStack space={2}>
					{questions.map(
						(item, index) =>
							index >= 3 && (
								<Formula
									size="S"
									data={item[quesIndex]}
									key={index}
									status={currentQuestionIndex == index ? EQuizStatus.ANSWER : EQuizStatus.HIDDEN}
									answerTag={answerTag[index]}
								/>
							)
					)}
				</VStack>
			</HStack>
			<Center flex={1}>
				{/* Question Info */}
				{/* Answer Group */}
				<GroupAnswer
					size="S"
					dataAnswer={{
						choices: currentQuestion[quesIndex].choices,
						answer: currentQuestion[quesIndex].answer,
					}}
					answerTag={answerTag[currentQuestionIndex]}
					setAnswerTag={(current: IAnserTag) => {
						const newAnswerTag: IAnserTag[] = [...answerTag];
						newAnswerTag[currentQuestionIndex] = current;
						setAnswerTag(newAnswerTag);
					}}
				/>
			</Center>
		</LessonLayout>
	);
};

export default memo(ObjectiveTest);

const styles = StyleSheet.create({});
