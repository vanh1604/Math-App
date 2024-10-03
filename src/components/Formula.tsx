import { StyleSheet } from "react-native";
import React from "react";
import { Box, HStack, Text } from "native-base";
import { EFont, EQuizStatus, IQuiz } from "../types/utils";
import BoxQuestion from "./BoxQuestion";
import { InterfaceHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";

type Props = {
	size: "M" | "S";
	status?: string;
	data: IQuiz;
	answerTag?: ChildNode | null;
} & InterfaceHStackProps;

const Formula = ({ size, status = EQuizStatus.ANSWER, data, answerTag, ...props }: Props) => {
	let fontSize: number, spacing;
	if (size == "M") {
		fontSize = 40;
		spacing = 7;
	} else if (size == "S") {
		fontSize = 30;
		spacing = 0;
	}

	const formula: { [key: string]: number | string } = {
		firstNum: data.firstNum,
		operation: data.operation,
		secondNum: data.secondNum,
		equal: "=",
	};

	return (
		<HStack
			space={spacing}
			alignItems={"center"}
			{...props}
		>
			{/* Formula */}
			{Object.keys(formula).map((option) => (
				<Box
					// style={{ width: 44 }}
					alignItems={"center"}
					key={option}
					opacity={status == EQuizStatus.HIDDEN ? 0.5 : 1}
				>
					<Text
						color={"#000"}
						fontSize={fontSize}
						fontWeight={"700"}
						fontFamily={EFont.Quicksand_700Bold}
					>
						{formula[option]}
					</Text>
				</Box>
			))}
			{/* Box Ques  & Box Answer */}
			{answerTag ? (
				answerTag
			) : (
				<BoxQuestion
					size={size}
					status={status}
				/>
			)}
		</HStack>
	);
};

export default Formula;

const styles = StyleSheet.create({});
