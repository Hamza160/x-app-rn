import {Text} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import SignOutButton from "@/components/SignOutButton";

export default function HomeScreen() {
    return (
        <SafeAreaView className="flex-1 flex-row justify-between">
            <Text>HomeScreen</Text>
            <SignOutButton />
        </SafeAreaView>
    )
}