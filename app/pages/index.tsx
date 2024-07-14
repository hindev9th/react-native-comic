import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/types/navigationTypes";
import {useEffect} from "react";
import {useFetchPage} from "@/hooks/api/useFetchPage";
import {ThemedView} from "@/components/ThemedView";
import ImagePage from "@/components/ImagePage";
import {ScrollView, Text} from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, 'pages'>;

export default function PagesScreen({route, navigation}: Props) {
  const {id, chapterNumber, name} = route.params;
  const {setPages, pages, isLoading} = useFetchPage(id, chapterNumber, name);

  useEffect(() => {
    navigation.setOptions({title: "Chapter " + chapterNumber, headerTransparent: true});
  }, [navigation]);

  return (
    <ScrollView style={{flex: 1}}>
      {pages?.map((value, index) => (
        <ImagePage url={value} key={index} />
      ))}
    </ScrollView>
  )
}