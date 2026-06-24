import { createFileRoute } from "@tanstack/react-router";
import { WeddingAlbum } from "@/components/WeddingAlbum";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sahil weds Payal — A Celebration of Love & Togetherness" },
      {
        name: "description",
        content:
          "With the blessings of Lord Jagannath and our beloved families, join Sahil & Payal as they begin their sacred journey on 15 December 2026 in Bhubaneswar.",
      },
      { property: "og:title", content: "Sahil weds Payal — A Sacred Odia Wedding" },
      {
        property: "og:description",
        content: "A luxurious Odia wedding invitation. Bless our union.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <WeddingAlbum />;
}
