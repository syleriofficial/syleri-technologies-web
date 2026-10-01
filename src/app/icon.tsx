import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Placeholder favicon (letter mark). Replace with the official Syleri Technologies logo when supplied.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#142026",
          color: "#fafbfa",
          fontSize: 44,
          fontWeight: 700,
          borderRadius: 14,
        }}
      >
        S
      </div>
    ),
    size,
  );
}
