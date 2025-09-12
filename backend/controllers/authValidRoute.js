const games = [
  {
    name: "Video-Game",
    score: 12,
    url: "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg",
    _id: 1,
  },
  {
    name: "Dart",
    score: 10,
    url: "https://images.pexels.com/photos/695266/pexels-photo-695266.jpeg",
    _id: 2,
  },
  {
    name: "Chess",
    score: 10,
    url: "https://images.pexels.com/photos/8580167/pexels-photo-8580167.jpeg",
    _id: 3,
  },
];

export const game = (req, res) => {
  return res
    .status(200)
    .json({ message: "List of Games fetched", success: true, games:games });
};
