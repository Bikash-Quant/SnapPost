import { ViewStyle } from "react-native";
import { Image } from "react-native";

interface AvatarProps {
  source: any;
  height?: number;
  width?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

const Avatar: React.FC<AvatarProps> = ({
  source,
  height = 54,
  width = 62,
  borderRadius = 9999,
  style = {},
}) => {
  return (
    <Image
      source={source}
      style={{
        height: height ?? "100%",
        width: width ?? "100%",
        borderRadius: borderRadius ?? 9999,
      }}
      resizeMode="cover"
    />
  );
};

export default Avatar;
