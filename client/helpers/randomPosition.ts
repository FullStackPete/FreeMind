export const randomPosition = (): { direction: "" | "-"; axis: "x" | "y" } => {
  const direction = Math.floor(Math.random() * 2) == 0 ? "" : "-";
  const axis = Math.floor(Math.random() * 2) == 0 ? "x" : "y";
  return { direction, axis };
};
