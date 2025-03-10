import { View, Text } from 'react-native'
import React from 'react'
import { useSharedValue } from 'react-native-reanimated'
import { Side } from "./wave"
import { snapPoint, useVector } from "react-native-redash"
import { HEIGHT, MARGIN_WIDTH, MIN_LEDGE, WIDTH } from '@/configs/constants'
import { Gesture } from "react-native-gesture-handler"

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
   
  const hasPrev = !!prev;
  const hasNext = !!next;
  const zIndex = useSharedValue(0);
  const activeSide = useSharedValue(Side.NONE);
  const isTransitionLeft = useSharedValue(false);
  const isTransitionRight = useSharedValue(false);
  const left = useVector(MIN_LEDGE, HEIGHT / 2);
  const right = useVector(MIN_LEDGE, HEIGHT / 2);
  console.log("fgf", left)
  const pandGesture = Gesture.Pan().onStart(({x}) => {
    if (x <= MARGIN_WIDTH && hasPrev) {
      activeSide.value = Side.LEFT,
      zIndex.value = 100;
    } else if ( x >= WIDTH - MARGIN_WIDTH && hasNext) {
      activeSide.value = Side.RIGHT;
    } else {
      activeSide.value = Side.NONE;
    }
  }).onUpdate(({x, y}) => {
    if (activeSide.value === Side.LEFT) {
      left.x.value = Math.max(x, MARGIN_WIDTH);
      left.y.value = y
    } else if (activeSide.value === Side.RIGHT) {
      right.x.value = Math.max(WIDTH - x, MARGIN_WIDTH);
      right.y.value = y
    }
  }).onEnd(({x, velocityX, velocityY}) => {
    if (activeSide.value === Side.LEFT) {
      const dest = snapPoint(x, velocityX, )
    }
  })


  return (
    <View>
      <Text>Slider</Text>
    </View>
  )
}