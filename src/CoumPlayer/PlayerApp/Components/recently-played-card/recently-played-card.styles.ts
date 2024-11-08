import { CSSProperties } from "react";
import { colors } from "../../../../colors";

export  const styles: {
    [key: string]: CSSProperties;
} = {
    modal: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
    },
    modalContent: {
        backgroundColor: colors.background,
        border: `1px solid ${colors.border}`,
        //boxShadow: `0 0 10px ${colors.border}`,
        position: "relative",
        borderRadius: 10,
        width: "90%",
        height: "90%"
    },
    heading: {
        color: colors.textPrimary,
        fontWeight: "bold",
        fontSize: 18
    },
    icon: {
        color: colors.textPrimary,
        fontSize: 20
    },
    bigIcon: {
        color: colors.textPrimary,
        fontSize: 24
    },
    pageTitle: {
        color: colors.textPrimary,
        fontSize: 24,
        fontWeight: "bold"
    },
    pageSubtitle: {
        color: colors.textSecondary,
        fontSize: 14,
    },
    card: {
        backgroundColor: colors.card,
        border: `1px solid #ffffff1f`,
        borderRadius: 16,
    }
}