import { onboarding } from "@/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { Image } from "react-native";
import CustomButton from "@/components/CustomButton";

export default function Onboarding() {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full bg-white items-center justify-between">
      <TouchableOpacity
        className="w-full justify-end items-end p-5"
        onPress={() => router.push("/sign-up")}
      >
        <Text className="text-sm font-semibold text-gray-500 font-JakartaBold">
          Skip
        </Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        showsButtons={false}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] bg-[#e2e8f0] rounded-full mr-1" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] bg-[#0286ff] rounded-full mr-1" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center">
            <Image
              source={item.image}
              className="w-full h-[300PX]"
              resizeMode="contain"
            />
            <View className="flex items-center justify-center w-full">
              <Text className="text-2xl font-semibold text-gray-500 font-JakartaBold w-full text-center mx-10">
                {item.title}
              </Text>
              <Text className="text-sm text-gray-500 font-JakartaRegular w-full text-center mt-3 mx-20">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        className="w-11/12 mt-10"
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
      />
    </SafeAreaView>
  );
}
