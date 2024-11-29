import React, { useEffect } from 'react';
import './notification.css';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="notification">
      {message}
    </div>
  );
};

export default Notification;