
export const formatDate = (date: Date | string) => {
    const validDate = typeof date === "string" ? new Date(date) : date;
    if (isNaN(validDate.getTime())) {
        console.error("Invalid date:", date);
        return "Invalid date"; 
    }
    return `${validDate.getDate()}/${validDate.getMonth() + 1}/${validDate.getFullYear()}`;
};



export const getTimeDifference = (pastDate: Date): string => {
    const validDate = typeof pastDate === "string" ? new Date(pastDate) : pastDate;
    if (isNaN(validDate.getTime())) {
        console.error("Invalid date:", pastDate);
        return "Invalid date"; 
    }
    const now = new Date();
    const diffMs = now.getTime() - validDate.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 60) {
        return `${diffMinutes} דקות`;
    } else if (diffHours < 24) {
        return `${diffHours} שעות`;
    } else {
        return `${diffDays} ימים`;
    }
}