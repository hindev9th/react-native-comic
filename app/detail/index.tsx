import {RootStackParamList} from "@/types/navigationTypes";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {comic} from "@/types/response";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import ImageView from "@/components/ImageView";
import {ThemedView} from "@/components/ThemedView";
import {useFetchChapters} from "@/hooks/api/useFetchChapters";
import {Link} from "expo-router";
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import {timeAgo} from "@/utils/formatTimeAgo";

type Props = NativeStackScreenProps<RootStackParamList, 'details'>;

// Props interface
export default function DetailScreen({route, navigation}: Props) {
  const {comic} = route.params;
  const comicData: comic = JSON.parse(comic);
  const [page, setPage] = useState(0);
  const {chapters, isLoading, isNext} = useFetchChapters(comicData.id,page)


  useEffect(() => {
    navigation.setOptions({ title: "", headerTransparent: true });
  }, [navigation]);


  return (
    <ParallaxScrollView
      headerBackgroundColor={{dark: "#000", light: "#fff"}}
      headerImage={
        <ImageView url={comicData.photo} styles={{width: "100%", height: "100%"}}/>
      }
      props={{
        onScroll : event => {
          let paddingToBottom = 10;
          paddingToBottom += event.nativeEvent.layoutMeasurement.height;
          if (event.nativeEvent.contentOffset.y >= event.nativeEvent.contentSize.height - paddingToBottom) {
            if (!isLoading && isNext) {
              setPage(prevState => prevState + 1)
            }
          }
        }
      }}
    >
      <Text style={styles.textName}>{comicData.name}</Text>
      <Text style={styles.textAnotherName}>Another name : {comicData.otherName}</Text>
      <Text style={styles.textAuthor}>Author : {comicData.author}</Text>
      <Text style={styles.textAuthor}>Latest chapter : {comicData.chapterLatest[0]}</Text>
      <ThemedView style={styles.textViewContainer}>
        <Text style={styles.textViewContainer}>View : {comicData.viewCount}</Text>
        <Text style={styles.textViewContainer}>Follow : {comicData.followerCount}</Text>
        <Text style={styles.textViewContainer}>Rate : {comicData.evaluationScore.toFixed(1)}</Text>
      </ThemedView>
      <Text style={styles.textDescription}>Mô tả</Text>
      <Text style={styles.textDescription}>{comicData.description}</Text>

      <TouchableOpacity style={styles.boxChapterContainer}>
        {chapters.map((value, index) => (
            <ThemedView style={styles.boxChapterContainerItem}>
              <Text style={styles.textChapter}>Chapter {value.numberChapter}</Text>
              <Text style={styles.textAgo}>{timeAgo(value.updateTime)}</Text>
            </ThemedView>
        ))}
        <ActivityIndicator size="small" animating={isLoading}/>
      </TouchableOpacity>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  textName : {
    color : "#fff",
    fontSize : 20,
    fontWeight: "800",
  },
  textAnotherName : {
    color : "#fff",
    fontSize : 15,
  },
  textAuthor : {
    color : "#fff",

  },
  boxViewContainer: {
    color : "#fff",

  },
  textViewContainer: {
    color : "#fff",

  },
  textDescription : {
    color : "#fff",

  },
  boxChapterContainer: {
    width: "100%"
  },
  boxChapterContainerItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textChapter : {
    color : "#fff",

  },
  textAgo : {
    color : "#fff",

  }

})