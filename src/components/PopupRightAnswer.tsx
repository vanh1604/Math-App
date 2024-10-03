import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Box, Center, HStack, Modal, Text, VStack, useTheme } from "native-base";
import { EFont } from "../types/utils";
import CustomBtn from "./CustomBtn";
import BackgroundLayout from "./BackgroundLayout";

type Props = {
	showModal: boolean;
	setShowModal: any;
	handleBtn: () => void;
	text?: string;
	title?: string;
};

const PopupRightAnswer = (props: Props) => {
	const { colors } = useTheme();
	const { showModal, title = "Yeah!", text = "Bạn đã trả lời đúng", handleBtn } = props;
	return (
		<Center>
			<Modal
				isOpen={showModal}
				onClose={() => {}}
			>
				<Modal.Content borderRadius={16}>
					<Modal.Body
						borderRadius={16}
						borderWidth={1}
						height={156}
					>
						<BackgroundLayout
							flex={1}
							style={{
								borderRadius: 16,
							}}
							imageSource={require("../../assets/images/bg-popup-right.gif")}
						>
							<VStack
								flex={1}
								alignItems={"center"}
								justifyContent={"center"}
							>
								<Text
									fontSize={24}
									fontFamily={EFont.Quicksand_700Bold}
									color={"primary.600"}
									fontWeight={"700"}
								>
									{title}
								</Text>
								<Text
									fontSize={16}
									fontFamily={EFont.Quicksand_400Regular}
									color={"text.coolGray"}
									mb={4}
								>
									{text}
								</Text>
								<CustomBtn
									btnColor={colors.gradient.primary}
									size="SM"
									text="Tiếp tục →"
									// TODO: Add Function here
									handleBtn={handleBtn}
								/>
							</VStack>
						</BackgroundLayout>
					</Modal.Body>
				</Modal.Content>
			</Modal>
		</Center>
	);
};

export default PopupRightAnswer;

const styles = StyleSheet.create({});
