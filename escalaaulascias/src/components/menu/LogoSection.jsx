import React from "react";
import { Box, Typography } from "@mui/material";

export default function LogoSection({ logo }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        paddingRight: "12px",
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="CIA Logo"
        sx={{
          height: "48px",
          width: "auto",
          objectFit: "contain",
          borderRadius: "6px",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      />
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          paddingTop: 1.25,
        }}
      >
        <Typography
          component="span"
          sx={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: "hsl(var(--primary))",
            lineHeight: 1,
          }}
        >
          Escala
        </Typography>
        <Typography
          component="span"
          sx={{
            fontSize: "0.75rem",
            color: "hsl(var(--muted-foreground))",
            fontWeight: 500,
            letterSpacing: "0.15em",
          }}
        >
          AULAS CIAS
        </Typography>
      </Box>
    </Box>
  );
}
