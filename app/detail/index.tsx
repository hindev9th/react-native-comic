import {RootStackParamList} from "@/types/navigationTypes";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {comic} from "@/types/response";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import ImageView from "@/components/ImageView";
import {ThemedView} from "@/components/ThemedView";
import {useFetchChapters} from "@/hooks/api/useFetchChapters";
import {Link} from "expo-router";
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, Animated} from "react-native";
import {useCallback, useEffect, useRef, useState} from "react";
import {timeAgo} from "@/utils/formatTimeAgo";
import {NativeSyntheticEvent} from "react-native/Libraries/Types/CoreEventTypes";
import {NativeScrollEvent} from "react-native/Libraries/Components/ScrollView/ScrollView";

type Props = NativeStackScreenProps<RootStackParamList, 'details'>;

// Props interface
export default function DetailScreen({route, navigation}: Props) {
  const {comic} = route.params;
  const comicData: comic = JSON.parse(comic);
  const [page, setPage] = useState(0);
  const {chapters, isLoading, isNext,firstNumber} = useFetchChapters(comicData.id, page)
  const offset = useRef(0);
  const [hideBottomNavigation, setHideBottomNavigation] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    navigation.setOptions({ title: "", headerTransparent: true });
  }, [navigation]);

  const scrollEvent = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const dif = currentOffset - (offset.current || 0);

    let paddingToBottom = 10;
    paddingToBottom += event.nativeEvent.layoutMeasurement.height;
    if (event.nativeEvent.contentOffset.y >= event.nativeEvent.contentSize.height - paddingToBottom) {
      if (!isLoading && isNext) {
        setPage(prevState => prevState + 1);
      }
    }

    if (Math.abs(dif) < 3) {
    } else if (dif < 0) {
      setHideBottomNavigation(false);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setHideBottomNavigation(true);
      Animated.timing(translateY, {
        toValue: 70,  // Height of the bottom navigation
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    offset.current = currentOffset;
  }, [isLoading, isNext, translateY]);


  const onReadFirstChapter = async () => {
    navigation.navigate("pages", {
      id : comicData.id,
      name: comicData.nameEn,
      chapterNumber: await firstNumber()
    })
  }

  return (
    <ThemedView style={{flex: 1}}>
      <ParallaxScrollView
        headerBackgroundColor={{dark: "#000", light: "#fff"}}
        headerImage={
          <ImageView url={comicData.photo} styles={{width: "100%", height: "100%"}}/>
        }
        props={{
          onScroll: event => scrollEvent(event),
          style: {flex: 1},
        }}
      >
        <ThemedView>
          <Text style={styles.textName}>{comicData.name}</Text>
          <Text style={styles.textAnotherName}>Another name : {comicData.otherName}</Text>
          <Text style={styles.textAuthor}>Author : {comicData.author}</Text>
          <Text style={styles.textAuthor}>Latest chapter : {comicData.chapterLatest[0]}</Text>
        </ThemedView>

        <ThemedView style={styles.boxViewContainer}>
          <Text style={styles.textViewContainer}>View : {comicData.viewCount}</Text>
          <Text style={styles.textViewContainer}>Follow : {comicData.followerCount}</Text>
          <Text style={styles.textViewContainer}>Rate : {comicData.evaluationScore.toFixed(1)}</Text>
        </ThemedView>
        <ThemedView>
          <Text style={styles.textDescription}>Mô tả :</Text>
          <Text style={styles.textDescription}>{comicData.description}</Text>
        </ThemedView>

        <ThemedView style={styles.boxChapterContainer}>
          {chapters.map((value, index) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("pages", {id : comicData.id, name: comicData.nameEn, chapterNumber: +value.numberChapter})}
              style={index === 1 ? styles.boxChapterContainerItemActive : styles.boxChapterContainerItem}
              key={index}>
              <Text style={styles.textChapter}>Chapter {value.numberChapter}</Text>
              <Text style={styles.textAgo}>{timeAgo(value.updateTime)}</Text>
            </TouchableOpacity>
          ))}
          <ActivityIndicator size="small" animating={isLoading}/>
        </ThemedView>
      </ParallaxScrollView>
      <Animated.View style={[styles.boxBottom, { transform: [{ translateY }] }]}>
        <TouchableOpacity
          onPress={() => onReadFirstChapter()}
          style={{width:'100%', height:'100%', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.textName}>Đọc từ đầu</Text>
        </TouchableOpacity>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  textName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
  },
  textAnotherName: {
    color: "#fff",
    fontSize: 15,
  },
  textAuthor: {
    color: "#fff",
  },
  boxViewContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textViewContainer: {
    color: "#fff",
  },
  textDescription: {
    color: "#fff",
  },
  boxChapterContainer: {
    width: "100%",
    gap: 10
  },
  boxChapterContainerItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderColor: "#1F1F1F",
    borderWidth: 1,
    backgroundColor: "#fff"
  },
  boxChapterContainerItemActive: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderColor: "#1F1F1F",
    borderWidth: 1,
    backgroundColor: "#1B6FA8",
    color: "#FAFCFC"
  },
  textChapter: {
    color: "#1F1F1F",
  },
  textChapterActive: {
    color: "#FAFCFC"
  },
  textAgo: {
    color: "#1F1F1F",
  },
  boxBottom: {
    height: 70,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1F1F1F",
    position: 'absolute',
    bottom: 0,
  }
});
