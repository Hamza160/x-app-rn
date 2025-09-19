import {Text, View, Image, TouchableOpacity} from "react-native";
import {useState} from "react";

export default function Index() {
    const [isLoading, setIsLoading] = useState(false);
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
                            onPress={() => {
                            }}
                            disabled={isLoading}
                            style={{}}
                        >
                            <View className="flex-row items-center justify-center">
                                <Image
                                    source={require("../../assets/images/google.png")}
                                    className="size-10"
                                    resizeMode="contain"
                                />
                                <Text className="text-black font-medium text-base">Continue With Google</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full py-3 px-6"
                            onPress={() => {
                            }}
                            disabled={isLoading}
                            style={{
                                shadowColor: "black",
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.1,
                                shadowRadius: 2,
                                elevation:2
                            }}
                        >
                            <View className="flex-row items-center justify-center">
                                <Image
                                    source={require("../../assets/images/apple.png")}
                                    className="size-8"
                                    resizeMode="contain"
                                />
                                <Text className="text-black font-medium text-base">Continue With Apple</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

// TODO:: search touchable opactiy