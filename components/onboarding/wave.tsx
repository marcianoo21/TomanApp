import { View, Text } from 'react-native'
import React from 'react'
import Animated ,{ SharedValue, useDerivedValue, withSpring }  from 'react-native-reanimated'
import SVG, { Path } from 'react-native-svg'
import { Vector } from 'react-native-redash'
import { MIN_LEDGE, Side, WIDTH } from '@/configs/constants'

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface WaveProps {
  side: Side,
  children: React.ReactElement,
  position: Vector<SharedValue<number>>,
  isTransitioning: SharedValue<boolean>
}

export default function Wave({side, children, position, isTransitioning}:WaveProps) {
  const R = useDerivedValue(() => {
    const value = Math.min(position.x.value - MIN_LEDGE, WIDTH / 2.5)
    return value > 0 ? value : MIN_LEDGE
  })

  const ledge = useDerivedValue(() => {
    const baseLedge = Math.max(0, position.x.value - MIN_LEDGE - R.value)
    return withSpring(isTransitioning.value ? position.x.value : baseLedge, {
      stiffness: 200,
    })
  })

  
  return (
    <View>
      <Text>Wave</Text>
    </View>
  )
}
