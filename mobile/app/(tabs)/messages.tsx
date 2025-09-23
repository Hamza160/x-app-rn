import {View, Text, Alert, TouchableOpacity, TextInput, ScrollView, Image} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {CONVERSATIONS, ConversationType} from "@/data/conversations";
import {Feather} from "@expo/vector-icons";

export default function MessageScreen() {
    const insets = useSafeAreaInsets()
    const [searchText, setSearchText] = useState('')
    const [conversionsList, setConversionsList] = useState(CONVERSATIONS)
    const [selectedConversion, setSelectedConversion] = useState<ConversationType | null>(null)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [newMessage, setNewMessage] = useState("")

    const deleteConversation = async (conversationId: number) => {
        Alert.alert("Deleting conversation", "Are you sure you want to delete this conversation?", [
            {
                text: "Cancel", style: "cancel",
            },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                    setConversionsList((prev) => prev.filter((conv) => conv.id !== conversationId))
                }
            }
        ])
    }

    const openConversation = async (conversation: ConversationType) => {
        setSelectedConversion(conversation)
        setIsChatOpen(true)
    }

    const closeChatModal = () => {
        setIsChatOpen(false)
        setSelectedConversion(null)
        setNewMessage("")
    }

    const sendMessage = () => {
        if (newMessage.trim() && selectedConversion) {
            setConversionsList((prev) =>
                prev.map((conv) =>
                    conv.id === selectedConversion.id
                        ? {...conv, lastMessage: newMessage, time: "now"}
                        : conv
                )
            )
        }
        setNewMessage("")
        Alert.alert("Message sent", `Your message has been sent to ${selectedConversion.user.name}`)
    }

    return (
        <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
            {/* Header   */}
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
                <Text className="text-xl font-bold text-gray-900">Messages</Text>
                <TouchableOpacity>
                    <Feather name="edit" size={24} color="#1DA1F2"/>
                </TouchableOpacity>
            </View>
            {/* Search Bar   */}
            <View className="px-4 py-3 border-b border-gray-100">
                <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
                    <Feather name="search" size={20} color="#657786"/>
                    <TextInput
                        placeholder="Search for people and groups"
                        className="flex-1 ml-3 text-base"
                        placeholderTextColor="#657786"
                    />
                </View>
            </View>
            {/* Conversations View */}
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{
                    paddingBottom: 100 + insets.bottom,
                }}
            >
                {conversionsList.map((conversation) => (
                    <TouchableOpacity
                        key={conversation.id}
                        className="flex-row items-center p-4 border-b border-gray-50 active:bg-gray-50"
                        onPress={() => openConversation(conversation)}
                        onLongPress={() => deleteConversation(conversation.id)}
                    >
                        <Image
                            source={{uri: conversation.user.avatar}}
                            className="size-12 rounded-full mr-3"
                        />
                        <View className="flex-1">
                            <View className="flex-row items-center justify-between mb-1">
                                <View className="flex-row items-center gap-1">
                                    <Text>{conversation.user.name}</Text>
                                    {conversation.user.verified && (
                                        <Feather name="check-circle" size={16} color="#1DA1F2" className="ml-1"/>
                                    )}
                                    <Text className="text-gray-500 text-sm ml-1">@{conversation.user.username}</Text>
                                </View>
                                <Text className="text-gray-500 text-sm">{conversation.time}</Text>
                            </View>
                            <Text className="text-gray-500 text-sm">{conversation.lastMessage}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {/* Quick Actions */}
            <View className="px-4 py-2 border-t border-gray-100 bg-gray-50">
                <Text className="text-xs text-gray-500 text-center">
                    Tap to open + Long press to delete
                </Text>
            </View>
        </SafeAreaView>
    )
}