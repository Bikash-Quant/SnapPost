"use client";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
// import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

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

export default function Page() {
  const { user } = useUser();
  const [expandedPosts, setExpandedPosts] = useState<number[]>([]);

  // useEffect(() => {
  //   window.chatbotConfig = {
  //     token: "tgupbU3GseH1Zjj4",
  //     baseUrl: "https://mobile2.quant.ngrok-free.app",
  //     iconColor: "green",
  //   };

  //   const script = document.createElement("script");
  //   script.src = "https://mobile2.quant.ngrok-free.app/embed.min.js";
  //   script.id = "tgupbU3GseH1Zjj4";
  //   script.defer = true;

  //   // Append the script to the body (or head if you prefer)
  //   document.body.appendChild(script);

  //   // Cleanup: remove the script tag when the component is unmounted
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  const htmlContent = `
  <!DOCTYPE html>
  <html style="border:1px solid red; height:100%; width:100%;">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script>
        window.chatbotConfig = {
          token: "tgupbU3GseH1Zjj4",
          baseUrl: "https://mobile2.quant.ngrok-free.app",
          iconColor: "green"
        };
      </script>
    </head>
    <body style="height:100%; width:100%; margin:0; padding:0;">
      <div id="test">Initial state</div>
      
      <script>
        // Put this script at the end of body to ensure DOM is loaded
        document.getElementById('test').innerText = 'Script is downloading...';
        document.body.style.backgroundColor = 'red';
        
        // Dynamically create and append the script
        const script = document.createElement('script');
        script.src = "https://obliging-welcome-lamb.ngrok-free.app/embed.min.js";
        script.id = "tgupbU3GseH1Zjj4";
        script.onload = function() {
          document.getElementById('test').innerText = 'Script loaded successfully!';
          document.body.style.backgroundColor = 'yellow';
        };
        script.onerror = function() {
          document.getElementById('test').innerText = 'Script failed to load!';
          document.body.style.backgroundColor = 'orange';
        };
        document.body.appendChild(script);
      </script>
    </body>
  </html>
`;

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
    {
      id: 4,
      title: "Mobile App Security Best Practices",
      preview: "Security should be a top priority in mobile app development...",
      fullContent:
        "Security should be a top priority in mobile app development. This comprehensive guide covers essential security practices, including data encryption, secure authentication, and protecting sensitive user information. Learn how to build safer mobile applications...",
    },
    {
      id: 5,
      title: "AI in Modern Web Development",
      preview:
        "Artificial Intelligence is revolutionizing how we build web applications...",
      fullContent:
        "Artificial Intelligence is revolutionizing how we build web applications. From intelligent code completion to automated testing, AI tools are becoming an integral part of the development workflow. Discover how AI can enhance your development process...",
    },
    {
      id: 6,
      title: "Mobile App Security Best Practices",
      preview: "Security should be a top priority in mobile app development...",
      fullContent:
        "Security should be a top priority in mobile app development. This comprehensive guide covers essential security practices, including data encryption, secure authentication, and protecting sensitive user information. Learn how to build safer mobile applications...",
    },
  ];

  const togglePost = (postId: number) => {
    setExpandedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.chatContainer}>
        <WebView
          source={{ html: htmlContent }}
          style={{ flex: 1 }}
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            alert("WebView error: " + JSON.stringify(nativeEvent));
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            alert("WebView HTTP error: " + JSON.stringify(nativeEvent));
          }}
          onMessage={(event) => {
            const message = JSON.parse(event.nativeEvent.data);
            switch (message.type) {
              case "scriptLoaded":
                Alert.alert("Script Loaded");
                break;
              case "scriptLoadError":
                Alert.alert("Script Load Failed");
                break;
              case "error":
                Alert.alert("JavaScript Error", message.message);
                break;
            }
          }}
          injectedJavaScript={`
            window.onerror = function(message, source, lineno, colno, error) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'error',
                message: message,
                source: source,
                lineno: lineno,
                colno: colno,
                error: error ? error.toString() : null
              }));
              return true;
            };
            
            document.addEventListener('DOMContentLoaded', function() {
              var script = document.querySelector('script[src="https://obliging-welcome-lamb.ngrok-free.app/embed.min.js"]');
              if (script) {
                script.onload = function() {
                  window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'scriptLoaded',
                    src: this.src
                  }));
                };
                script.onerror = function() {
                  window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'scriptLoadError',
                    src: this.src
                  }));
                };
              }
            });
            true;
          `}
        />
      </View>
      <ScrollView>
        {/* <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut> */}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    position: "absolute",
    top: 50,
    right: 0,
    width: 300, // Adjust based on your needs
    height: 300, // Adjust based on your needs
    zIndex: 1000,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  welcome: {
    fontSize: 18,
    marginBottom: 20,
  },
  authButtons: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  authButton: {
    color: "#4a90e2",
    fontSize: 16,
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
