import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  PanResponder,
  Animated,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Avatar from "./Avatar";
import closeIcon from "@/assets/icons/close.png";
import attachIcon from "@/assets/icons/attachment.png";
import sendIcon from "@/assets/icons/send.png";
import TypingText from "@/components/TypingText";

// import LinearGradient from "react-native-linear-gradient";

// Configuration Type Definition
interface ChatbotConfig {
  theme: {
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
    botBubbleColor: string;
    userBubbleColor: string;
    avatarImage: any;
  };
  apiEndpoint: string;
  botName: string;
  botImage: any;
}

// Default Configuration
const defaultConfig: ChatbotConfig = {
  theme: {
    primaryColor: "#007bff",
    backgroundColor: "#f4f4f4",
    textColor: "#000000",
    botBubbleColor: "#e6e6e6",
    userBubbleColor: "#007bff",
  },
  apiEndpoint: "https://your-api-endpoint.com/chat",
  botName: "ChatBot",
};

const FloatingChatbot: React.FC<{ config?: Partial<ChatbotConfig> }> = ({
  config = {},
}) => {
  // Merge default and provided configurations
  const mergedConfig: ChatbotConfig = {
    ...defaultConfig,
    ...config,
    theme: { ...defaultConfig.theme, ...config.theme },
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    {
      text: string;
      sender: "user" | "bot";
      typing?: boolean;
    }[]
  >([
    {
      text: "Hi! Welcome to Telco. I'm Quant. How can I help you today?",
      sender: "bot",
      typing: false,
    },
    {
      text: "what can you do for me",
      sender: "user",
      typing: false,
    },
    {
      text: "Thinking ...",
      sender: "bot",
      typing: true,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Draggable Icon Position
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = { text: inputText, sender: "user" as const };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Start loading and add typing indicator
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: "", sender: "bot", typing: true }]);

    try {
      // Simulate API call (replace with actual fetch)
      const response = await fetch(mergedConfig.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await response.json();

      // Remove typing indicator and add bot response
      setMessages((prev) =>
        prev
          .filter((msg) => !msg.typing)
          .concat({ text: data.response, sender: "bot" })
      );
    } catch (error) {
      console.error("Chat API Error:", error);
      setMessages((prev) =>
        prev
          .filter((msg) => !msg.typing)
          .concat({ text: "Sorry, something went wrong.", sender: "bot" })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (message: (typeof messages)[0]) => {
    const isBot = message.sender === "bot";

    if (message.typing) {
      return (
        <View
          style={[
            styles.messageBubble,
            isBot ? styles.botBubble : styles.userBubble,
            {
              backgroundColor: isBot
                ? mergedConfig.theme.botBubbleColor
                : mergedConfig.theme.userBubbleColor,
            },
          ]}
        >
          <TypingText
            msg={message.text}
            // color={mergedConfig.theme.primaryColor}
          />
        </View>
      );
    }

    return (
      <View
        style={[
          styles.messageBubble,
          isBot ? styles.botBubble : styles.userBubble,
          {
            backgroundColor: isBot
              ? mergedConfig.theme.botBubbleColor
              : mergedConfig.theme.userBubbleColor,
          },
        ]}
      >
        <Text
          style={[styles.messageText, { color: mergedConfig.theme.textColor }]}
        >
          {message.text}
        </Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    floatingIcon: {
      position: "absolute",
      bottom: 20,
      right: 20,
      width: 62,
      height: 56,
      borderRadius: 30,
      backgroundColor: "gray",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: mergedConfig.theme.backgroundColor,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 15,
      backgroundColor: mergedConfig.theme.primaryColor,
      paddingTop: 20,
    },
    closeButton: {
      color: "white",
      fontSize: 18,
    },
    chatContainer: {
      flex: 1,
      padding: 10,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    inputContainer: {
      flexDirection: "column",
      padding: 10,
    },
    input: {
      flex: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
    },
    messageBubble: {
      maxWidth: "80%",
      padding: 10,
      borderRadius: 10,
      marginVertical: 5,
    },
    botBubble: {
      alignSelf: "flex-start",
    },
    userBubble: {
      alignSelf: "flex-end",
    },
    messageText: {
      fontSize: 16,
    },
    inputButton: {
      padding: 8,
    },
    sendButton: {
      padding: 8,
    },
  });

  return (
    <>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.floatingIcon,
          {
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => setIsOpen(true)}
          style={{
            height: 54,
            width: 60,
            borderRadius: 9999,
          }}
        >
          <Avatar
            source={mergedConfig.theme.avatarImage}
            height={54}
            width={62}
            borderRadius={9999}
          />
        </TouchableOpacity>
      </Animated.View>

      <Modal
        visible={isOpen}
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            <View className="flex items-center" style={styles.header}>
              <View className="flex flex-row justify-start items-center gap-1 flex-grow">
                <Avatar
                  source={mergedConfig.theme.avatarImage}
                  height={44}
                  width={50}
                  borderRadius={9999}
                />
                {mergedConfig.botName && (
                  <Text style={{ color: "white", fontSize: 18 }}>
                    {mergedConfig.botName}
                  </Text>
                )}
                {mergedConfig.botImage && (
                  <Avatar
                    source={mergedConfig.botImage}
                    height={30}
                    width={180}
                    borderRadius={1}
                  />
                )}
              </View>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Avatar source={closeIcon} height={20} width={20} />
              </TouchableOpacity>
            </View>

            {/* <LinearGradient
            colors={["rgb(255, 255, 255)", "rgb(221, 240, 215)"]} // Set gradient colors
            start={{ x: 0, y: 0 }} // Starting point of gradient (top-left)
            end={{ x: 0, y: 1 }} // Ending point of gradient (bottom-left)
            locations={[0, 0.523]} // Set the percentage for color stops (52.3%)
            style={styles.chatContainer}
          > */}
            <View
              style={[
                styles.chatContainer,
                { backgroundColor: "rgb(221, 240, 215)" },
              ]}
            >
              {messages.map((msg, index) => (
                <React.Fragment key={index}>
                  {renderMessage(msg)}
                </React.Fragment>
              ))}
            </View>
            {/* </LinearGradient> */}

            {/* <View style={styles.inputContainer}>
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                placeholder="Type a message..."
                style={styles.input}
              />
              <TouchableOpacity onPress={sendMessage} disabled={isLoading}>
                <Text style={{ color: mergedConfig.theme.primaryColor }}>
                  Send
                </Text>
              </TouchableOpacity>
            </View> */}
            <View
              style={[{ backgroundColor: "rgb(221, 240, 215)" }]}
              className="p-4"
            >
              <View
                style={styles.inputContainer}
                className="bg-white rounded-[8px]"
              >
                <View className="h-[40px] rounded-[12px]">
                  <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Ask me anything..."
                    placeholderTextColor="#999"
                    onSubmitEditing={sendMessage}
                    focusable
                  />
                </View>
                <View className="flex flex-row justify-between items-center">
                  <View className="flex start items-center">
                    <TouchableOpacity style={styles.inputButton}>
                      <Avatar
                        height={24}
                        width={24}
                        borderRadius={1}
                        source={attachIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.sendButton}
                    onPress={sendMessage}
                  >
                    <Avatar
                      height={24}
                      width={24}
                      borderRadius={1}
                      source={sendIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default FloatingChatbot;
