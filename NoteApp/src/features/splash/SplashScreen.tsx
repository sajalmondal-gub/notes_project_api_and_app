import React from "react";
import { markFirstTimeCompleted } from "../../services/storage/asyncStorage";

interface SplashScreenProps {
    onFinish: () => void;
}

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {

    const handleGetStarted = async () => {
        await markFirstTimeCompleted();
        onFinish();
    }
}