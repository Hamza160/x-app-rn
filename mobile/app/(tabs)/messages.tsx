import {View, Text, Alert} from 'react-native'
import React, {useState} from 'react'
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {CONVERSATIONS, ConversationType} from "../../../data/conversations";

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
        Alert.alert("Message sent", `Your messasge has been sent to ${selectedConversion.user.name}`)
    }

    return (
        <View>
            <Text>messages</Text>
        </View>
    )
}