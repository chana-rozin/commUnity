import { ForumMessageType } from '@/types/forum';

type Props = {
  message: ForumMessageType;
};

const ForumMessage = ({ message }: Props) => {
  return (
    <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
      {/* Username with highlight */}
      <strong className="text-blue-600 mr-2">{message.user}:</strong>
      
      {/* Message text with word wrap */}
      <span className="break-words">{message.text}</span>
    </div>
  );
};

export default ForumMessage;