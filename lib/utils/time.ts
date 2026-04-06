export function getTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  const weekDay = date.toLocaleString("en-US", { weekday: "short" });

  return `${weekDay} ${month} ${day}, ${year}`;
}
