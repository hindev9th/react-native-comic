import {ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import useFetchComics from "@/hooks/api/useFetchComics";
import {useCallback, useState} from "react";
import {ThemedView} from "@/components/ThemedView";
import ImageView from "@/components/ImageView";
import {ThemedText} from "@/components/ThemedText";
import {useRouter} from "expo-router";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/types/navigationTypes";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({navigation}: Props) {
  const router = useRouter()
  const [page, setPage] = useState(0);
  const {comics, isNext, loading , fetch} = useFetchComics({page})
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(0)
    await fetch()
    setRefreshing(false);
  }, []);

  return (
    <ScrollView onScroll={event => {
      let paddingToBottom = 10;
      paddingToBottom += event.nativeEvent.layoutMeasurement.height;
      if (event.nativeEvent.contentOffset.y >= event.nativeEvent.contentSize.height - paddingToBottom) {
        if (!loading && isNext) {
          setPage(prevState => prevState + 1)
        }
      }
    }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
    >
      <ThemedView style={styles.comics}>
        {comics.map((comic, index) => (
          <TouchableOpacity onPress={() => navigation.navigate("details", {comic: JSON.stringify(comic)})}
                            key={index}
                            style={styles.comic}>
            <ImageView url={comic.photo} styles={styles.image}/>
            <ThemedView style={styles.textInfo}>
              <Text style={styles.textName} numberOfLines={2}>{comic.name}</Text>
              <Text style={styles.textChapter}>Chapter {comic.chapterLatest[0]}</Text>
            </ThemedView>
          </TouchableOpacity>
        ))}
      </ThemedView>
      {loading && (
        <ThemedView style={styles.loading}>
          <ThemedText>Loading...</ThemedText>
          <ActivityIndicator size="small" animating={loading}/>
        </ThemedView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  comics: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  comic: {
    width: "50%",
    height: 360,
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000000",
    overflow: "hidden",
    backgroundColor: "#F4B333"
  },
  image: {
    width: "100%",
    height: 300,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000000",
  },
  textInfo: {
    height: 60,
    backgroundColor: "transparent",
    padding: 5,
    justifyContent: "space-between",
    alignItems: "center"
  },
  textName: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "800",
    color: "#fff"
  },
  textChapter: {
    fontSize: 10,
    textAlign: "center",
    fontWeight: "300",
    color: "#fff"
  },
  loading: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    opacity: 0.5,
    bottom: 0,
    left: 0,
    right: 0
  }
});
