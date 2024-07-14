import FastImage from "react-native-fast-image";
import { ThemedView } from "./ThemedView";
import { Image, Dimensions } from "react-native";
import { useState, useEffect } from "react";

export default function ImagePage({ url }: { url: string }) {
    const [size, setSize] = useState({
        width: Dimensions.get('window').width,
        height: 100,
    });

    useEffect(() => {
        Image.getSizeWithHeaders(
          url,
          {
              priority: "i",
              referer: process.env.EXPO_PUBLIC_API_URL ?? ""
          },
          (originalWidth, originalHeight) => {
              const screenWidth = Dimensions.get('window').width;
              const scaledHeight = (originalHeight / originalWidth) * screenWidth;
              setSize({
                  width: screenWidth,
                  height: scaledHeight,
              });
          }
        );
    }, [url]);

    return (
      <ThemedView style={{ flex: 1, width: "100%", height: "100%" }}>
          <Image
            source={{
                uri: url,
                headers: {
                    priority: "i",
                    referer: process.env.EXPO_PUBLIC_API_URL ?? ""
                },
                cache: "only-if-cached"
            }}
            style={{ width: size.width, height: size.height }}
          />
      </ThemedView>
    );
}
