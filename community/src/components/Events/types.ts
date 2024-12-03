interface EventCardProps {
    title: string;
    date: string;
    description: string;
    buttonText: string;
    buttonIcon: string;
    bookmarkIcon: string;
  }
  
  interface SearchBarProps {
    searchIcon: string;
    filterIcon: string;
  }
  
  export type { EventCardProps, SearchBarProps };