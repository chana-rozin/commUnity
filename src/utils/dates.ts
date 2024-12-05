
export const formatDate = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};


export const getTimeDifference = (pastDate: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - pastDate.getTime();
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
};