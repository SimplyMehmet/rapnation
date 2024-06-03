import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rapnation",
  description:
    "Application looking for rap songs you might like based on your choice of artist",
  other: {
    "msapplication-TileColor": "#040F0F",
  },
  icons: {
    icon: [
      {
        type: "image/png",
        url: "/favicon-16x16.png",
        sizes: "16x16",
      },
      {
        type: "image/png",
        url: "/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#040F0F",
      },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
    },
  },
};
