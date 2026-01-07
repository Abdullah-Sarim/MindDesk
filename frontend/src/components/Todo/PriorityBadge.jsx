function PriorityBadge({ priority = "medium" }) {
  const styles = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`text-xs px-2 py-0.5 rounded font-medium ${
        styles[priority] || styles.medium
      }`}
    >
      {priority.toUpperCase()}
    </span>
  );
}

export default PriorityBadge;
