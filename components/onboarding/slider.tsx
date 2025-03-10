import { View, Text, Platform } from 'react-native'
import React, { act, useEffect } from 'react'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { snapPoint, useVector } from "react-native-redash"
import { HEIGHT, LEFT_SNAP_POINT, MARGIN_WIDTH, MIN_LEDGE, NEXT, PREV, RIGHT_SNAP_POINT, WIDTH, Side } from '@/configs/constants'
import { Gesture, GestureDetector } from "react-native-gesture-handler"

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
  const panGesture = Gesture.Pan()
  .onStart(({ x }) => {
    if (x <= MARGIN_WIDTH && hasPrev) {
      activeSide.value = Side.LEFT;
      zIndex.value = 100;
    } else if (x >= WIDTH - MARGIN_WIDTH && hasNext) {
      activeSide.value = Side.RIGHT;
    } else {
      activeSide.value = Side.NONE;
    }
  })
  .onUpdate(({ x, y }) => {
    if (activeSide.value === Side.LEFT) {
      left.x.value = Math.max(x, MARGIN_WIDTH);
      left.y.value = y;
    } else if (activeSide.value === Side.RIGHT) {
      right.x.value = Math.max(WIDTH - x, MARGIN_WIDTH);
      right.y.value = y;
    }
  })
  .onEnd(({ x, velocityX, velocityY }) => {
    if (activeSide.value === Side.LEFT) {
      const dest = snapPoint(x, velocityX, LEFT_SNAP_POINT);
      isTransitionLeft.value = dest === PREV;

      left.x.value = withSpring(
        dest,
        {
          velocity: velocityX,
          overshootClamping: isTransitionLeft.value,
          restSpeedThreshold: isTransitionLeft.value ? 100 : 0.01,
          restDisplacementThreshold: isTransitionLeft.value ? 100 : 0.01,
        },
        () => {
          if (isTransitionLeft.value) {
            runOnJS(setIndex)(index - 1);
          } else {
            zIndex.value = 0;
            activeSide.value = Side.NONE;
          }
        }
      );

      left.y.value = withSpring(HEIGHT / 2, { velocity: velocityY });
    } else if (activeSide.value === Side.RIGHT) {
      const dest = snapPoint(x, velocityX, RIGHT_SNAP_POINT);
      isTransitionRight.value = dest === NEXT;

      right.x.value = withSpring(
        WIDTH - dest,
        {
          velocity: velocityX,
          overshootClamping: isTransitionRight.value,
          restSpeedThreshold: isTransitionRight.value ? 100 : 0.01,
          restDisplacementThreshold: isTransitionRight.value ? 100 : 0.01,
        },
        () => {
          if (isTransitionRight.value) {
            runOnJS(setIndex)(index + 1);
          } else {
            activeSide.value = Side.NONE;
          }
        }
      );
      right.y.value = withSpring(HEIGHT / 2, { velocity: velocityY })
    }
  });

  const leftStyle = useAnimatedStyle(() => ({
    zIndex: zIndex.value
  }))

  useEffect(() => {
    if (Platform.OS === 'ios') {
      right.x.value = withSpring(WIDTH * 0.167)
    } else {
      right.x.value = withSpring(WIDTH * 0.185)
    }
  }, [left, right])
  


  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={StyleSheet.absoluteFill}>
        {current}
        {
          prev && (
            <Animated.View  style={StyleSheet.absoluteFill, leftStyle}>

              </Animated.View>
          )
        }
        {
          next && (
            <View style={StyleSheet.absoluteFill}>

            </View>
          )
        }
      </Animated.View>
    </GestureDetector>
  )
}