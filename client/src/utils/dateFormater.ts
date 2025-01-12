export const formatCreatedAt = (createdAt: string) => {
  const createdDate = new Date(createdAt);
  const now = new Date();

  const isToday = createdDate.toDateString() === now.toDateString();

  const hours = createdDate.getHours().toString().padStart(2, "0");
  const minutes = createdDate.getMinutes().toString().padStart(2, "0");

  if (isToday) {
    return `${hours}:${minutes}`;
  } else {
    const day = createdDate.getDate().toString().padStart(2, "0");
    const month = (createdDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    return `${day}/${month} - ${hours}:${minutes}`;
  }
};
