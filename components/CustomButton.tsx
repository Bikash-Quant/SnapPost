import { Text, TouchableOpacity } from "react-native";

import { ButtonProps } from "@/types/type";

export default function CustomButton({
  title,
  bgVariant = "primary",
  className,
  onPress,
  IconLeft,
  IconRight,
  textVariant = "default",
  ...props
}: ButtonProps) {
  const getButtonStyle = () => {
    switch (bgVariant) {
      case "primary":
        return "bg-[#0286ff]";
      case "secondary":
        return "bg-[#e2e8f0]";
      case "danger":
        return "bg-red-500";
      case "success":
        return "bg-green-500";
      case "outline":
        return "bg-transparent border-neutral-300 border-[0.5px]";
      default:
        return "bg-[#0286ff]";
    }
  };

  const getTextStyle = () => {
    switch (textVariant) {
      case "primary":
        return "text-black";
      case "secondary":
        return "text-gray-100";
      case "danger":
        return "text-red-100";
      case "success":
        return "text-green-100";
      default:
        return "text-white";
    }
  };

  return (
    <TouchableOpacity
      className={`w-full py-4 px-5 rounded-full flex flex-row shadow-md items-center justify-center ${getButtonStyle()} ${className}`}
      onPress={onPress}
    >
      {IconLeft && <IconLeft />}
      <Text
        className={`text-base font-semibold font-JakartaBold ${getTextStyle()}`}
      >
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
}
