import { View, Text } from 'react-native'
import React from 'react'

interface SliderProps {
  index: number;
  children: JSX.Element;
  prev?: JSX.Element;
  next?: JSX.Element;
  setIndex: (value: number) => void;
}

export default function Slider({ 
  index,
  children: CurrentRenderContext,
  prev,
  next,
  setIndex
}: SliderProps) {
   
  return (
    <View>
      <Text>Slider</Text>
    </View>
  )
}