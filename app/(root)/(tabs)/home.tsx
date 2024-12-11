"use client";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
// import { Link } from "expo-router";
import { useState } from "react";
import { Text, View, ScrollView, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import FloatingChatbot from "@/components/FloatingChatbot";
import defaultAvatar from "@/assets/images/default.png";
import logoText from "@/assets/images/logoText.png";

import FloatingChatbot from "react-native-quant-chat-sdk";

declare global {
  interface Window {
    chatbotConfig: {
      token: string;
      baseUrl: string;
      iconColor: string;
      theme?: {
        primaryColor: string;
      };
    };
  }
}

type BlogPost = {
  id: number;
  title: string;
  preview: string;
  fullContent: string;
};

export default function HomePage() {
  const { user } = useUser();
  const apiToken = `Bearer ${process.env.EXPO_PUBLIC_TOKEN}`;
  const [expandedPosts, setExpandedPosts] = useState<number[]>([]);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of React Native in 2024",
      preview: "React Native continues to evolve with exciting new features...",
      fullContent:
        "React Native continues to evolve with exciting new features. The introduction of the new architecture, including Fabric and TurboModules, promises better performance and reliability. Developers can expect improved cross-platform capabilities and enhanced native integration...",
    },
    {
      id: 2,
      title: "Understanding TypeScript Generics",
      preview:
        "TypeScript generics provide a way to create reusable components...",
      fullContent:
        "TypeScript generics provide a way to create reusable components that can work with multiple types. This powerful feature enables type-safe programming while maintaining code flexibility. Learn how to leverage generics in your next project...",
    },
    {
      id: 3,
      title: "AI in Modern Web Development",
      preview:
        "Artificial Intelligence is revolutionizing how we build web applications...",
      fullContent:
        "Artificial Intelligence is revolutionizing how we build web applications. From intelligent code completion to automated testing, AI tools are becoming an integral part of the development workflow. Discover how AI can enhance your development process...",
    },
    // {
    //   id: 4,
    //   title: "Mobile App Security Best Practices",
    //   preview: "Security should be a top priority in mobile app development...",
    //   fullContent:
    //     "Security should be a top priority in mobile app development. This comprehensive guide covers essential security practices, including data encryption, secure authentication, and protecting sensitive user information. Learn how to build safer mobile applications...",
    // },
    // {
    //   id: 5,
    //   title: "AI in Modern Web Development",
    //   preview:
    //     "Artificial Intelligence is revolutionizing how we build web applications...",
    //   fullContent:
    //     "Artificial Intelligence is revolutionizing how we build web applications. From intelligent code completion to automated testing, AI tools are becoming an integral part of the development workflow. Discover how AI can enhance your development process...",
    // },
    // {
    //   id: 6,
    //   title: "Mobile App Security Best Practices",
    //   preview: "Security should be a top priority in mobile app development...",
    //   fullContent:
    //     "Security should be a top priority in mobile app development. This comprehensive guide covers essential security practices, including data encryption, secure authentication, and protecting sensitive user information. Learn how to build safer mobile applications...",
    // },
  ];

  const customConfig = {
    theme: {
      primaryColor: "#fff",
      backgroundColor: "#ffffff",
      textColor: "#000000",
      botBubbleColor: "#f0f0f0",
      userBubbleColor: "#fff",
      backgroundColorKey: "#f5f5f5", // Added background color key
      avatarImage: defaultAvatar,
    },
    apiEndpoint: "https://app.eng.quant.ai/api/chat-messages",
    apiToken: apiToken,
    botName: "",
    botImage: logoText,
  };

  const togglePost = (postId: number) => {
    setExpandedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.blogContainer}>
          {blogPosts.map((post) => (
            <View key={post.id} style={styles.blogPost}>
              <Text style={styles.blogTitle}>{post.title}</Text>
              <Text style={styles.blogContent}>
                {expandedPosts.includes(post.id)
                  ? post.fullContent
                  : post.preview}
              </Text>
              <Pressable onPress={() => togglePost(post.id)}>
                <Text style={styles.readMoreButton}>
                  {expandedPosts.includes(post.id) ? "Read Less" : "Read More"}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
      <FloatingChatbot config={customConfig} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  blogContainer: {
    gap: 20,
    marginBottom: 60,
  },
  blogPost: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  blogContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  readMoreButton: {
    color: "#4a90e2",
    fontWeight: "600",
  },
});
