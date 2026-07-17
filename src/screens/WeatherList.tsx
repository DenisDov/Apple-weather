import { Ionicons, Feather } from "@expo/vector-icons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Canvas, LinearGradient, RoundedRect, Shadow, vec } from "@shopify/react-native-skia";
import { Text, View, StyleSheet, Pressable, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BackgroundGradient from "@/components/BackgroundGradient";
import WeatherWidget from "@/components/WeatherWidget";
import useApplicationDimensions from "@/hooks/useApplicationDimensions";
import { ForecastList } from "@/lib/data/ForecastData";

export default function WeatherList() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { width } = useApplicationDimensions();
  return (
    <>
      <BackgroundGradient />
      {/* Header */}
      <SafeAreaView edges={["top"]} style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-sharp" size={34} color="rgba(235,235,245,.6)" />
            </Pressable>
            <Text style={styles.titleText}>Weather</Text>
          </View>
          <Ionicons name="ellipsis-horizontal-circle" size={34} color="white" />
        </View>
        {/* Searchbar */}
        <View style={styles.searchbar}>
          <Canvas style={StyleSheet.absoluteFill}>
            <RoundedRect x={0} y={0} width={width - 32} height={36} r={10}>
              <LinearGradient
                start={vec(0, 0)}
                end={vec(width - 32, 36)}
                colors={["rgba(46,51,90,0.26)", "rgba(28,27,51, 0.26)"]}
              />
              <Shadow dx={0} dy={4} blur={4} color="rgba(0,0,0,1)" inner />
            </RoundedRect>
          </Canvas>
          <View style={styles.searchInputRow}>
            <Feather name="search" size={17} color="rgba(235,235,246,0.6)" />
            <TextInput
              placeholder="Search for a city or airport"
              placeholderTextColor="rgba(235,235,246,0.6)"
              style={styles.searchInput}
            />
          </View>
        </View>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          {ForecastList.map((forecast, i) => (
            <WeatherWidget forecast={forecast} key={i} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchbar: {
    marginHorizontal: 16,
    borderRadius: 10,
    height: 36,
  },
  searchInputRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  scrollView: {
    flex: 1,
    paddingTop: 20,
  },
  scrollViewContent: {
    alignItems: "center",
    gap: 20,
    paddingBottom: 100,
  },
  titleText: {
    color: "white",
    fontFamily: "SF-Semibold",
    fontSize: 28,
  },
  searchInput: {
    color: "rgba(235,235,246,0.5)",
    fontFamily: "SF-Regular",
    fontSize: 17,
    paddingLeft: 10,
  },
});
