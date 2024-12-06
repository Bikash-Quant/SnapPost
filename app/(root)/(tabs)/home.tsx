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
// import { embedChatbot } from "./chatbotScript";

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

  const embedChatbotString = `
    async function embedChatbot(){
      let d=window.chatbotConfig||window.difyChatbotConfig,
      n=d?.iconColor??"#0370B6";
      if(d&&d.token){
        let i=\`<img src='\${d.baseUrl}/logo/speechbubble.png' style="height: 35px; width: 35px" />\`,
        o=\`<img src='\${d.baseUrl}/logo/arrow-down-s-line.svg' style="height: 35px; width: 35px"/>\`,
        r=d.baseUrl;
        if(!document.getElementById("chatbot-bubble-button")){
          let e=document.createElement("div"),
          t=(e.id="chatbot-bubble-button",document.createElement("div"));
          e.style.cssText=\`position: fixed; bottom: 1rem; right: 1rem; width: 50px; height: 50px; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px; cursor: pointer; z-index: 2147483647; transition: all 0.2s ease-in-out; background-color: \${n};\`,
          t.style.cssText=\`display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;\`,
          t.innerHTML=i,e.appendChild(t),document.body.appendChild(e),
          e.addEventListener("mouseenter",()=>{e.style.backgroundColor=n}),
          e.addEventListener("mouseleave",()=>{e.style.backgroundColor=n}),
          e.addEventListener("click",()=>{
            if(document.getElementById("chatbot-bubble-window")){
              let e=document.getElementById("chatbot-bubble-container");
              "scale(0)"===e.style.transform||"0"===e.style.opacity?(e.style.visibility="visible",
              setTimeout(()=>{e.style.transform="scale(1)",e.style.opacity="1"},10),t.innerHTML=o):(e.style.transform="scale(0)",
              e.style.opacity="0",setTimeout(()=>{e.style.visibility="hidden",t.innerHTML=i},500))
            }else{
              let n=document.createElement("div");
              n.id="chatbot-bubble-container",
              n.style.cssText="position: fixed; bottom: 5rem; right: 1rem; height: 85%; width: 24rem; max-width: calc(100vw - 1rem); max-height: calc(100vh - 6rem); border-radius: 0.75rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: rgba(150, 150, 150, 0.2) 0px 10px 30px 0px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px; z-index: 2147483647; overflow: hidden; background-color: #FFFFFF; transition: transform 0.5s ease, opacity 0.5s ease; transform: scale(0); opacity: 0; visibility: hidden;";
              var e=document.createElement("button");
              e.innerHTML='<svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L1 9M1 1L9 9" stroke="#475467" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
              e.style.cssText=\`position: absolute; top: 23px; right: 8px; background: transparent; border: none; font-size: 1.5rem; cursor: pointer; z-index: 2147483648; display: none;\`,
              e.addEventListener("click",()=>{
                n.style.transform="scale(0)",
                n.style.opacity="0",
                setTimeout(()=>{
                  n.style.visibility="hidden",
                  document.getElementById("chatbot-bubble-button").querySelector("div").innerHTML=i
                },500)
              });
              let s=document.createElement("iframe");
              s.allow="fullscreen;microphone",
              s.title="Chatbot window",
              s.id="chatbot-bubble-window",
              s.src=r+"/chatbot/"+d.token,
              s.style.cssText=\`border: none; height: 100%; width: 100%; border-radius: 0.75rem;\`,
              n.appendChild(e),
              n.appendChild(s),
              document.body.appendChild(n),
              (e=()=>{
                var e=window.matchMedia("(max-width: 768px)").matches,
                t=n.style.visibility,
                i=n.style.transform,
                o=n.style.opacity;
                e?(
                  n.style.cssText=\`position: fixed; top: 0; left: 0; bottom: 0; right: 0; width: 100vw; height: 100%; border-radius: 0; z-index: 2147483647; background-color: #FFFFFF; display: flex; justify-content: center; overflow: hidden; transition: transform 0.5s ease, opacity 0.5s ease;\`,
                  s.style.cssText=\`border: none; height: 100%; width: 100%; border-radius: 0;\`
                ):(
                  n.style.cssText=\`position: fixed; bottom: 5rem; right: 1rem; height: 85%; width: 24rem; max-width: calc(100vw - 1rem); max-height: calc(100vh-6rem); border-radius: 0.75rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: rgba(150, 150, 150, 0.2) 0px 10px 30px 0px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px; z-index: 2147483647; overflow: hidden; background-color: #FFFFFF; transition: transform 0.5s ease, opacity 0.5s ease;\`,
                  s.style.cssText=\`border: none; height: 100%; width: 100%; border-radius: 0.75rem;\`
                ),
                n.style.visibility=t,
                n.style.transform=i,
                n.style.opacity=o
              })(),
              window.addEventListener("resize",e)
            }
            setTimeout(()=>{
              let e=document.getElementById("chatbot-bubble-container");
              e.style.visibility="visible",
              setTimeout(()=>{
                e.style.transform="scale(1)",
                e.style.opacity="1"
              },10),
              t.innerHTML=o
            },10)
          })
        }
      }else console.error("Chatbot token is empty")
    }
  `;

  const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <style>
        body { margin: 0; padding: 0; background: transparent; }
      </style>
    </head>
    <body>
      <script>
        window.chatbotConfig = {
          token: "tgupbU3GseH1Zjj4",
          baseUrl: "https://obliging-welcome-lamb.ngrok-free.app",
          iconColor: 'blue'
        };
      </script>
      <script>          
          // Define the embedChatbot function
          ${embedChatbotString}
          
          // Call the function when document is ready
          document.addEventListener('DOMContentLoaded', function() {
            console.log("dom content is loaded)
            embedChatbot();
          });
          
          // Also call it immediately in case DOMContentLoaded already fired
          embedChatbot();
        </script>
    </body>
  </html>
`;

  console.log("htmlContent:", htmlContent);

  return (
    <SafeAreaView>
      <View style={styles.chatContainer}>
        <WebView
          source={{ html: htmlContent }}
          style={{ flex: 1, backgroundColor: "white" }}
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          mixedContentMode="always"
          cacheEnabled={false}
          onShouldStartLoadWithRequest={(request) => {
            console.log("Load Request:", request);
            return true;
          }}
          onLoadStart={() => console.log("WebView: Load Started")}
          onLoadEnd={() => {
            console.log("WebView: Load Ended");
          }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn("WebView error:", nativeEvent);
            Alert.alert("WebView Error", JSON.stringify(nativeEvent));
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn("WebView HTTP error:", nativeEvent);
            Alert.alert("HTTP Error", JSON.stringify(nativeEvent));
          }}
          onMessage={(event) => {
            try {
              const data = JSON.parse(event.nativeEvent.data);
              console.log("WebView message:", data);

              if (data.type === "error") {
                console.error("Error:", data.data);
                Alert.alert("Error", JSON.stringify(data.data));
              } else if (data.type === "success") {
                console.log("Success:", data.data);
              }
            } catch (error) {
              console.error("Message parsing error:", error);
            }
          }}
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
    right: 20,
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
