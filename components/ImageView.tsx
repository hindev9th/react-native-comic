import { ThemedView } from "./ThemedView";
import {Image, ImagePropsBase, ImageStyle, StyleProp} from "react-native";

export default function ImageView({ url, styles, props }: { url: string, styles: StyleProp<ImageStyle>, props?: ImagePropsBase }) {
  return (
    <ThemedView style={{flex : 1,backgroundColor: "#F4B333"}}>
      <Image source={{
        uri: url,
        headers: {
          priority: "i",
          referer: process.env.EXPO_PUBLIC_API_URL ?? ""
        },
      }} style={styles} {...props}  />
    </ThemedView>
  )
}