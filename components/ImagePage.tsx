import FastImage from "react-native-fast-image";
import { ThemedView } from "./ThemedView";

export default function ImagePage({ url }: { url: string }) {
    return (
        <ThemedView style={{ flex: 1, width: "100%", height: "100%" }}>
            <FastImage source={{
                uri: url,
                headers: {
                    priority: "i",
                    referer: process.env.EXPO_PUBLIC_API_URL ?? ""
                },
                priority: FastImage.priority.normal,
            }} style={{ width: "100%", height: 1400, flex: 1 }} onLoadEnd={() => { }} />
        </ThemedView>

    );
}