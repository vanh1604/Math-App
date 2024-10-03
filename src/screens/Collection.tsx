import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import LessonLayout from "../components/LessonLayout";
import { Box, Text, HStack, VStack, ScrollView } from "native-base";
import { EFont, IListBadges } from "../types/utils";
import BackgroundLayout from "../components/BackgroundLayout";
import { Image } from "expo-image";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScreenNavigationProps } from "../navigations/config";
import { allBadges } from "../data/mockup";
import PopupRightAnswer from "../components/PopupRightAnswer";
import { loadSound } from "../utils/func";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Add this import

type Props = {};

interface IBadges {
  id: number;
  badgeId: number;
  name: string;
}

const playSound = new Audio.Sound();
const Collection = (props: Props) => {
  const navigation = useNavigation<ScreenNavigationProps>();

  const [myBadges, setMyBadges] = useState<IBadges[]>([]);
  const [badges, setBadges] = useState<IListBadges>(allBadges);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadBadges = async () => {
      try {
        const storedBadges = await AsyncStorage.getItem("myBadges"); // Fetch badges from Async Storage
        const list: IBadges[] = storedBadges ? JSON.parse(storedBadges) : []; // Parse the stored badges
        console.log("🚀 ~ loadBadges ~ list:", list);
        let newListBadges = { ...allBadges };
        // remove collected badges
        list.forEach((badge) => {
          if (allBadges[badge.badgeId]) {
            delete newListBadges[badge.badgeId];
          }
        });
        setMyBadges(list);
        setBadges(newListBadges);
      } catch (err) {
        console.log(err);
      }
    };
    loadBadges();
  }, [showModal]);

  const handlePickBadge = async (badgeId: number) => {
    // Make this function async
    const playSound = new Audio.Sound();
    loadSound(playSound, require("../../assets/sound/correct.mp3"));
    const currentBadges = await AsyncStorage.getItem("myBadges"); // Get current badges
    const updatedBadges = currentBadges ? JSON.parse(currentBadges) : []; // Parse current badges
    updatedBadges.push({ badgeId }); // Add new badge
    await AsyncStorage.setItem("myBadges", JSON.stringify(updatedBadges)); // Save updated badges
    setShowModal(true);
  };

  const handleNextQues = () => {
    navigation.navigate("Home");
  };

  useFocusEffect(() => {
    loadSound(playSound, require("../../assets/sound/win.mp3"));
    const unsubscribe = async () => {
      await playSound.stopAsync();
    };

    return () => unsubscribe();
  });

  return (
    <LessonLayout
      iconSource={require("../../assets/images/bg-3.jpg")}
      handleBack={() => navigation.navigate("Home")}
    >
      <PopupRightAnswer
        showModal={showModal}
        setShowModal={setShowModal}
        handleBtn={handleNextQues}
        text={"Bạn đã nhận được huy hiệu"}
      />
      <Box flex={1}>
        <Box height={20} width={"60%"} mt={"-6"} alignSelf={"center"}>
          <BackgroundLayout
            imageSource={require("../../assets/images/label.png")}
          >
            <Box flex={1} justifyContent={"center"} alignItems={"center"}>
              <Text
                fontFamily={EFont.Quicksand_700Bold}
                fontSize={18}
                color={"white"}
                textTransform={"uppercase"}
              >
                Thu thập nhãn dán
              </Text>
            </Box>
          </BackgroundLayout>
        </Box>
        <VStack height={"70%"}>
          {/* Box Badges */}
          <HStack flex={1} px={12} space={4}>
            {myBadges.map((badge) => (
              <Box key={badge.badgeId}>
                <Image
                  style={{ width: 32, height: 32 }}
                  source={allBadges[badge.badgeId].image}
                />
              </Box>
            ))}
          </HStack>
          {/* List Available Badges */}
          <Box px={12}>
            <Box
              bgColor={"#173D55"}
              borderRadius={100}
              justifyContent={"center"}
              py={2}
            >
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HStack px={8} alignItems={"center"} space={4}>
                  {Object.keys(badges).map((badgeId: any, idx) => (
                    <TouchableOpacity
                      key={`${badgeId}-${idx}`}
                      onPress={() => handlePickBadge(badgeId)}
                    >
                      <Image
                        style={{ width: 32, height: 32 }}
                        source={badges[badgeId].image}
                      />
                    </TouchableOpacity>
                  ))}
                </HStack>
              </ScrollView>
            </Box>
          </Box>
        </VStack>
      </Box>
    </LessonLayout>
  );
};

export default Collection;

const styles = StyleSheet.create({});
