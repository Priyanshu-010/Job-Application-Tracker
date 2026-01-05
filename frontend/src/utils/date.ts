export const timeAgo = (dateString: string | null | undefined): string => {
  if (!dateString) return "N/A";
  
  const now = new Date();
  const past = new Date(dateString);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (isNaN(seconds)) return "N/A";
  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  
  return past.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "N/A";
  
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};   