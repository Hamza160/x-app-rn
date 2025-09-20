import {Text, View, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import {useSocialAuth} from "@/hooks/useSocialAuth";

export default function Index() {
    const {isLoading, handleSocialAuth} = useSocialAuth();
    return (
        <View className="flex-1 bg-white">
            <View className="flex-1 px-8 justify-between">
                <View className="flex-1 justify-center">
                    {/*  Demo Image  */}
                    <Image
                        source={require("../../assets/images/auth2.png")}
                        className="size-96"
                        resizeMode="contain"
                    />
                    <View className="flex-col gap-2">

                        <TouchableOpacity
                            className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full py-3 px-6"
                            onPress={() => handleSocialAuth("oauth_google")}
                            disabled={isLoading}
                            style={{}}
                        >
                            {isLoading ? <ActivityIndicator size="small" color="#000"/> : (
                                <View>
                                    <View className="flex-row items-center justify-center">
                                        <Image
                                            source={require("../../assets/images/google.png")}
                                            className="size-10"
                                            resizeMode="contain"
                                        />
                                        <Text className="text-black font-medium text-base">Continue With Google</Text>
                                    </View>
                                </View>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full py-3 px-6"
                            onPress={() => handleSocialAuth("oauth_apple")}
                            disabled={isLoading}
                            style={{
                                shadowColor: "black",
                                shadowOffset: {width: 0, height: 1},
                                shadowOpacity: 0.1,
                                shadowRadius: 2,
                                elevation: 2
                            }}
                        >
                            {isLoading ? <ActivityIndicator size="small" color="#000"/> :
                                (
                                    <View>
                                        <View className="flex-row items-center justify-center">
                                            <Image
                                                source={require("../../assets/images/apple.png")}
                                                className="size-8"
                                                resizeMode="contain"
                                            />
                                            <Text className="text-black font-medium text-base">Continue With
                                                Apple</Text>
                                        </View>
                                    </View>
                                )}
                        </TouchableOpacity>
                    </View>
                    {/*  Terms and Privacy  */}
                    <Text className="text-center text-gray-500 text-xs leading-4 mt-6 px-2">
                        By Signing up, you agree to our <Text className="text-blue-500">Terms</Text>
                        {", "}
                        <Text className="text-blue-500">Privacy Policy</Text>
                        {", "}
                        <Text className="text-blue-500">Cookie Use</Text>.
                    </Text>
                </View>
            </View>
        </View>
    );
}

// TODO:: search touchable opacity