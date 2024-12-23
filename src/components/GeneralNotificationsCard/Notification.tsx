import React from 'react';
import { BiBell, BiTime, BiCalendarExclamation } from 'react-icons/bi';
import { Notifications, UrgencyLevel, NotificationType,SubjectInNotificationType } from '@/types/general.type';

// Notification wrapper component with proper TypeScript types
interface NotificationWrapperProps {
  urgencyLevel: UrgencyLevel;
  children: React.ReactNode;
}

const NotificationWrapper: React.FC<NotificationWrapperProps> = ({ urgencyLevel, children }) => {
  const getUrgencyStyles = () => {
    switch (urgencyLevel) {
      case UrgencyLevel.High:
        return 'border-red-500 bg-red-50';
      case UrgencyLevel.Medium:
        return 'border-yellow-500 bg-yellow-50';
      case UrgencyLevel.Low:
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  return (
    <div className={`rounded-lg border-2 p-4 ${getUrgencyStyles()} transition-all duration-300`}>
      {children}
    </div>
  );
};

interface ReminderNotificationProps {
  notification: Notifications;
}

const ReminderNotification: React.FC<ReminderNotificationProps> = ({ notification }) => {
  const getIcon = () => {
    switch (notification.subject.type) {
      case SubjectInNotificationType.loan:
        return <BiTime className="h-5 w-5" />;
      case SubjectInNotificationType.babysitting:
        return <BiCalendarExclamation className="h-5 w-5" />;
      default:
        return <BiBell className="h-5 w-5" />;
    }
  };

  const getTitle = () => {
    switch (notification.subject.type) {
      case SubjectInNotificationType.loan:
        return 'תזכורת להחזרת פריט';
      case SubjectInNotificationType.babysitting:
        return 'תזכורת לבייביסיטינג';
      default:
        return 'תזכורת';
    }
  };

  return (
    <NotificationWrapper urgencyLevel={notification.urgencyLevel}>
      <div className="flex items-start gap-4">
        <div className="text-blue-600">{getIcon()}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">
            {getTitle()}
          </h3>
          <div className="text-sm text-gray-700">
            {notification.message}
            <div className="mt-2 text-xs text-gray-500">
              נשלח על ידי: {notification.sender.first_name} {notification.sender.last_name}
            </div>
          </div>
        </div>
      </div>
    </NotificationWrapper>
  );
};

interface RequestNotificationProps {
  notification: Notifications;
}

const RequestNotification: React.FC<RequestNotificationProps> = ({ notification }) => {
  const handleAccept = () => {
    // TODO: Implement accept logic
    console.log('Accepted request:', notification._id);
  };

  const handleReject = () => {
    // TODO: Implement reject logic
    console.log('Rejected request:', notification._id);
  };

  const getRequestTypeInfo = () => {
    switch (notification.subject.type) {
      case SubjectInNotificationType.loan:
        return {
          icon: <BiTime className="h-5 w-5" />,
          title: 'בקשת השאלה',
          acceptText: 'אשר השאלה',
          rejectText: 'דחה בקשה'
        };
      case SubjectInNotificationType.babysitting:
        return {
          icon: <BiCalendarExclamation className="h-5 w-5" />,
          title: 'בקשת בייביסיטינג',
          acceptText: 'אשר בייביסיטינג',
          rejectText: 'דחה בקשה'
        };
      default:
        return {
          icon: <BiBell className="h-5 w-5" />,
          title: 'בקשה חדשה',
          acceptText: 'אשר',
          rejectText: 'דחה'
        };
    }
  };

  const requestInfo = getRequestTypeInfo();

  return (
    <NotificationWrapper urgencyLevel={notification.urgencyLevel}>
      <div className="flex items-start gap-4">
        <div className="text-blue-600">{requestInfo.icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">
            {requestInfo.title}
          </h3>
          <div>
            <div className="text-sm text-gray-700 mb-3">{notification.message}</div>
            <div className="text-xs text-gray-500 mb-3">
              נשלח על ידי: {notification.sender.first_name} {notification.sender.last_name}
            </div>
            <div className="flex gap-2 justify-end">
              <button 
                className="px-4 py-2 text-sm rounded-md bg-red-50 hover:bg-red-100 border border-red-200 text-red-700"
                onClick={handleReject}
              >
                {requestInfo.rejectText}
              </button>
              <button 
                className="px-4 py-2 text-sm rounded-md bg-green-600 hover:bg-green-700 text-white"
                onClick={handleAccept}
              >
                {requestInfo.acceptText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </NotificationWrapper>
  );
};

export { ReminderNotification, RequestNotification };