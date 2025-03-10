import { View, Text } from 'react-native'
import React from 'react'
import Animated ,{ SharedValue, useDerivedValue }  from 'react-native-reanimated'
import SVG, { Path } from 'react-native-svg'
import { Vector } from 'react-native-redash'
import { Side } from '@/configs/constants'

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface WaveProps {
  side: Side,
  children: React.ReactElement,
  position: Vector<SharedValue<number>>
}

export default function Wave({side, children, position, isTransitioning}:WaveProps) {
  const R = useDerivedValue(() => {
    const value = Math.min(position.x.value)
  })
  return (
    <View>
      <Text>Wave</Text>
    </View>
  )
}