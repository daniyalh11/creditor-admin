import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserFilter } from '@/contexts/UserFilterContext';
import { 
  Users, Archive, User, UserCog, BookOpen, Users2
} from 'lucide-react';

export const UserFilterMenu = () => {
  const { 
    selectedRole,
    setSelectedRole,
    isFilterMenuOpen,
    setIsFilterMenuOpen,
    users
  } = useUserFilter();
  
  const menuRef = useRef(null);
  
  // Filter options with icons
  const filterOptions = [
    { 
      label: 'Administrators', 
      value: 'administrator', 
      icon: <UserCog size={18} />,
      count: users.filter(user => user.role.includes('administrator')).length
    },
    { 
      label: 'Learners', 
      value: 'learner', 
      icon: <User size={18} />,
      count: users.filter(user => user.role.includes('learner')).length
    },
    { 
      label: 'Friends', 
      value: 'friends', 
      icon: <Users2 size={18} />,
      count: users.filter(user => user.role.includes('friends')).length
    },
    { 
      label: 'Archived', 
      value: 'archived', 
      icon: <Archive size={18} />,
      count: users.filter(user => user.role.includes('archived')).length
    },
    { 
      label: 'Managers', 
      value: 'manager', 
      icon: <UserCog size={18} />,
      count: users.filter(user => user.role.includes('manager')).length
    },
    { 
      label: 'Instructors', 
      value: 'instructor', 
      icon: <BookOpen size={18} />,
      count: users.filter(user => user.role.includes('instructor')).length
    },
    { 
      label: 'All', 
      value: 'all', 
      icon: <Users size={18} />,
      count: users.length
    }
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsFilterMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsFilterMenuOpen]);
  
  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setIsFilterMenuOpen(false);
  };
  
  return (
    <div className="relative" ref={menuRef}>
      <AnimatePresence>
        {isFilterMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200"
          >
            <div className="py-1">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  className={`flex items-center w-full px-4 py-3 text-left text-sm ${
                    selectedRole === option.value ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelectRole(option.value)}
                >
                  <span className="w-6 h-5 flex items-center mr-2 text-gray-500">
                    {option.icon}
                  </span>
                  <span>{option.label}</span>
                  {option.count !== undefined && (
                    <span className="ml-auto px-2 py-0.5 bg-gray-100 text-xs rounded-full">
                      {option.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};