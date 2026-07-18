import React from "react";
import { View, ViewStyle } from "react-native";


interface SkeletonProps {
    width?: number | string;
    height?: number | string;
    variant?: 'circle' | 'rect' | 'text';
    className?: string;
    style?: ViewStyle;
}

const Skeleton: React.FC<SkeletonProps> = () => {
    return (
        <View></View>
    );
}
export default Skeleton;