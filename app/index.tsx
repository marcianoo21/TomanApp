import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import useAuthStore from '@/app/authStore'
import { Redirect } from 'expo-router'

const index = () => {
    const { loggedInUser, setLoggedInUser, loading, setLoading } = useAuthStore();

      useEffect(() => {
        const subscription = async () => {
            const token = SecureStore.getItem("accessToken")
            console.log("TOKEN:", token)
            setLoggedInUser(token ? true : false)
            setLoading(false)
        }
        subscription();
      }, [])
      
  return (
   <>
    {
        loading ?
        <>
        </>
        : (
            <Redirect href={!loggedInUser ? "/(routes)/onboarding/index" : "/(tabs)"}/>
        )
    }
   </>
  )
}

export default index
