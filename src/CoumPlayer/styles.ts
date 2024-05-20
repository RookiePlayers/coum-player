import { CSSProperties } from "react";
import { colors } from "../colors";

export  const styles: {
    [key: string]: CSSProperties;
} = {
    card: {
        width: "100%",
        height: "100%",
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        backgroundColor: colors.background
    },
    album: {
        width: 80,
        height: 80,
        borderRadius: 8,
        objectFit: "cover",
        border: `1px solid ${colors.border}`
    }
} 