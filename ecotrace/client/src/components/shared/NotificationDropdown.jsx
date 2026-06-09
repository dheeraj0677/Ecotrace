import useDashboardStore from '@/store/dashboardStore';
import { motion } from 'framer-motion';
import { Bell, Check, X } from 'lucide-react';

export default function NotificationDropdown({ onClose }) {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useDashboardStore();

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-dark-surface rounded-xl shadow-xl border border-gray-100 dark:border-forest-900/50 z-50 overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-forest-900/50">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-dark-text">Notifications</h3>
          <button
            onClick={markAllNotificationsRead}
            className="text-xs text-forest-500 hover:text-forest-600 font-medium"
          >
            Mark all read
          </button>
        </div>
        <div className="max-h-72 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-400 dark:text-gray-500">No notifications yet</p>
            </div>
          ) : (
            notifications.slice(0, 10).map((n) => (
              <div
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                className={`px-4 py-3 border-b border-gray-50 dark:border-forest-900/30 cursor-pointer hover:bg-gray-50 dark:hover:bg-forest-900/20 transition-colors ${
                  !n.read ? 'bg-forest-50/50 dark:bg-forest-900/10' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">{n.icon || '🔔'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-dark-text font-medium">{n.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{n.message}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {new Date(n.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {!n.read && (
                    <div className="w-2 h-2 rounded-full bg-forest-500 flex-shrink-0 mt-2" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </>
  );
}
