import { View, Text, Button } from 'react-native';
import { useClerk } from "@clerk/clerk-expo";
import {useEffect} from "react";
import {router} from "expo-router";

export default function HomeScreen() {
    const { signOut } = useClerk();

    return (
        <View>
            <Text>This is Home Page</Text>
            <Button onPress={() => router.push('/(tabs)')} title="logout"></Button>
        </View>
    )
}  