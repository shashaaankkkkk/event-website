import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Clock, PenSquare, IndianRupee, Users, HelpCircle, ChevronRight } from 'lucide-react';

const AnimatedSidebar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { 
      id: 'home',
      icon: <Home size={24} />,
      title: 'Home Dashboard',
      url: '/dashboard',
      color: 'rgb(236, 72, 153)',
      description: 'View your main dashboard'
    },
    { 
      id: 'schedule',
      icon: <Clock size={24} />,
      title: 'Schedule Events',
      url: '/schedule',
      color: 'rgb(99, 102, 241)',
      description: 'Manage your timeline'
    },
    { 
      id: 'editor',
      icon: <PenSquare size={24} />,
      title: 'Content Editor',
      url: '/editor',
      color: 'rgb(34, 197, 94)',
      description: 'Create and edit content'
    },
    { 
      id: 'payments',
      icon: <IndianRupee size={24} />,
      title: 'Payments',
      url: '/payments',
      color: 'rgb(234, 179, 8)',
      description: 'Manage transactions'
    },
    { 
      id: 'users',
      icon: <Users size={24} />,
      title: 'User Management',
      url: '/users',
      color: 'rgb(236, 72, 153)',
      description: 'Handle user accounts'
    },
    { 
      id: 'help',
      icon: <HelpCircle size={24} />,
      title: 'Support Center',
      url: '/help',
      color: 'rgb(147, 51, 234)',
      description: 'Get help and support'
    },
  ];

  const handleNavigation = (url, id) => {
    setActiveTab(id);
    // In a real app, you'd use your router here
    console.log(`Navigating to: ${url}`);
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      <motion.div
        initial={false}
        animate={{
          width: isExpanded ? 300 : 70,
          height: isExpanded ? 480 : 400,
          borderRadius: isExpanded ? 24 : 100
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-gray-900/95 backdrop-blur-lg relative overflow-hidden"
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0 opacity-50"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 0%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Menu Container */}
        <motion.div
          className="flex flex-col gap-3 p-4 relative"
          initial={false}
        >
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => handleNavigation(item.url, item.id)}
              className={`relative flex items-center gap-3 p-3 rounded-2xl transition-colors
                ${activeTab === item.id ? 'text-white' : 'text-gray-400 hover:text-gray-200'}
                ${isExpanded ? 'pr-6' : 'justify-center'}
                hover:bg-white/10 backdrop-blur-lg
              `}
              initial={false}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              custom={index}
              animate={isExpanded ? "expanded" : "collapsed"}
              variants={{
                expanded: {
                  y: 0,
                  opacity: 1,
                  transition: { delay: index * 0.05 }
                },
                collapsed: {
                  y: 0,
                  opacity: 1
                }
              }}
            >
              <motion.div
                className="relative z-10"
                animate={{ 
                  rotate: activeTab === item.id ? [0, 360] : 0,
                  scale: activeTab === item.id ? [1, 1.2, 1] : 1
                }}
                transition={{ duration: 0.5 }}
              >
                {item.icon}
              </motion.div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 text-left"
                  >
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-xs text-gray-400">{item.description}</div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active Indicator */}
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 rounded-2xl"
                  style={{ backgroundColor: `${item.color}20` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Hover Arrow */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="absolute right-2"
                  >
                    <ChevronRight size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedSidebar;