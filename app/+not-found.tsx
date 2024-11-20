import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';



export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-20">
        <Text className="text-2xl font-bold">This screen doesn't exist.</Text>
        <Link href="/" className="mt-15">
          <Text className="text-blue-500">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
