import React, { createContext, useContext, useState } from 'react';

const UserFilterContext = createContext();

export function UserFilterProvider({ children }) {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Aberin, David",
      role: ["learner"],
      avatar: "/lovable-uploads/2e656932-0755-44b1-807b-2b0a175c1d9b.png",
      email: "david.aberin@example.com",
      lastVisited: "2 days ago",
      groups: 3,
      courses: 3
    },
    {
      id: 2,
      name: "Adams, Anthony",
      role: ["learner"],
      avatar: "/lovable-uploads/a9e707a6-09a6-4f71-83fa-dfdc4e52cb13.png",
      email: "anthony.adams@example.com",
      lastVisited: "15 days ago",
      groups: 3,
      courses: 3
    },
    {
      id: 3,
      name: "Admin, Graham",
      role: ["instructor", "administrator"],
      avatar: "/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png",
      email: "graham.admin@example.com",
      lastVisited: "Never",
      groups: 6,
      courses: 0
    },
    {
      id: 4,
      name: "admin, Test",
      role: ["administrator"],
      avatar: "/lovable-uploads/9fce6a44-d177-48aa-848b-8454dfa6ca7e.png",
      email: "admin@example.com",
      lastVisited: "28 minutes ago",
      groups: 3,
      superAdmin: true
    },
    {
      id: 5,
      name: "Aliomar, Alfonzo",
      role: ["learner"],
      avatar: "/lovable-uploads/dc27ec74-b2e9-4467-8adc-6a66a52eb520.png",
      email: "alfonzo.aliomar@example.com",
      lastVisited: "11 hours ago",
      groups: 3,
      courses: 4
    },
    {
      id: 6,
      name: "Allen, Jade",
      role: ["learner"],
      avatar: "/lovable-uploads/172887ec-721f-41fe-8b85-47de3f4e0499.png",
      email: "jade.allen@example.com",
      lastVisited: "1 day ago",
      groups: 3,
      courses: 20
    },
    {
      id: 7,
      name: "Alonso, Juan",
      role: ["learner"],
      avatar: "/lovable-uploads/2e656932-0755-44b1-807b-2b0a175c1d9b.png",
      email: "juan.alonso@example.com",
      lastVisited: "27 days ago",
      groups: 4,
      courses: 20
    },
    {
      id: 8,
      name: "alsawy, Sarah",
      role: ["learner"],
      avatar: "/lovable-uploads/dc27ec74-b2e9-4467-8adc-6a66a52eb520.png",
      email: "sarah.alsawy@example.com",
      lastVisited: "3 days ago",
      groups: 3,
      courses: 2
    },
    {
      id: 9,
      name: "Aman, Carlos",
      role: ["learner"],
      avatar: "/lovable-uploads/172887ec-721f-41fe-8b85-47de3f4e0499.png",
      email: "carlos.aman@example.com",
      lastVisited: "1 day ago",
      groups: 3,
      courses: 3
    },
    {
      id: 10,
      name: "Amir, Zaahir-Rashid",
      role: ["learner"],
      avatar: "/lovable-uploads/a9e707a6-09a6-4f71-83fa-dfdc4e52cb13.png",
      email: "zaahir.amir@example.com",
      lastVisited: "12 days ago",
      groups: 4,
      courses: 20
    },
    {
      id: 11,
      name: "Arya, Mayank",
      role: ["instructor", "manager", "administrator"],
      avatar: "/lovable-uploads/dc27ec74-b2e9-4467-8adc-6a66a52eb520.png",
      email: "mayank.arya@example.com",
      lastVisited: "28 days ago",
      groups: 4,
      superAdmin: true
    },
    {
      id: 12,
      name: "Garrido, Ryan",
      role: ["instructor"],
      avatar: "/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png",
      email: "ryan.garrido@example.com",
      lastVisited: "Never",
      groups: 4
    },
    {
      id: 13,
      name: "Instructor, Demo",
      role: ["instructor"],
      avatar: "/lovable-uploads/9fce6a44-d177-48aa-848b-8454dfa6ca7e.png",
      email: "demo.instructor@example.com",
      lastVisited: "6 days ago",
      groups: 3
    },
    {
      id: 14,
      name: "Kumar, Samir",
      role: ["instructor", "administrator"],
      avatar: "/lovable-uploads/2e656932-0755-44b1-807b-2b0a175c1d9b.png",
      email: "samir.kumar@example.com",
      lastVisited: "1 hour ago",
      groups: 10,
      courses: 1,
      superAdmin: true
    },
    {
      id: 15,
      name: "Mallik, Navneen",
      role: ["instructor"],
      avatar: "/lovable-uploads/a9e707a6-09a6-4f71-83fa-dfdc4e52cb13.png",
      email: "navneen.mallik@example.com",
      lastVisited: "11 days ago",
      groups: 2
    },
    {
      id: 16,
      name: "Rowland, PaulMichael",
      role: ["instructor"],
      avatar: "/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png",
      email: "paulmichael.rowland@example.com",
      lastVisited: "1 hour ago",
      groups: 5,
      courses: 23
    },
    {
      id: 17,
      name: "Smith, John",
      role: ["instructor"],
      avatar: "/lovable-uploads/172887ec-721f-41fe-8b85-47de3f4e0499.png",
      email: "john.smith@example.com",
      lastVisited: "Never",
      groups: 4
    },
    {
      id: 18,
      name: "Cantiller, Jevah",
      role: ["manager"],
      avatar: "/lovable-uploads/9fce6a44-d177-48aa-848b-8454dfa6ca7e.png",
      email: "jevah.cantiller@example.com",
      lastVisited: "17 hours ago",
      groups: 2
    },
    {
      id: 19,
      name: "Gharfalkar, Jay",
      role: ["manager"],
      avatar: "/lovable-uploads/dc27ec74-b2e9-4467-8adc-6a66a52eb520.png",
      email: "jay.gharfalkar@example.com",
      lastVisited: "2 days ago",
      groups: 3
    },
    {
      id: 20,
      name: "Jagadeesh, Tharani",
      role: ["manager", "administrator"],
      avatar: "/lovable-uploads/a9e707a6-09a6-4f71-83fa-dfdc4e52cb13.png",
      email: "tharani.jagadeesh@example.com",
      lastVisited: "1 day ago",
      groups: 4,
      superAdmin: true
    },
    {
      id: 21,
      name: "Malik, Gaurav",
      role: ["manager"],
      avatar: "/lovable-uploads/172887ec-721f-41fe-8b85-47de3f4e0499.png",
      email: "gaurav.malik@example.com",
      lastVisited: "29 days ago",
      groups: 2
    },
    {
      id: 22,
      name: "mashi, Anjali",
      role: ["manager"],
      avatar: "/lovable-uploads/dc27ec74-b2e9-4467-8adc-6a66a52eb520.png",
      email: "anjali.mashi@example.com",
      lastVisited: "8 days ago",
      groups: 3
    },
    {
      id: 23,
      name: "sanchez, Patricia",
      role: ["manager"],
      avatar: "/lovable-uploads/2e656932-0755-44b1-807b-2b0a175c1d9b.png",
      email: "patricia.sanchez@example.com",
      lastVisited: "15 hours ago",
      groups: 2
    },
    {
      id: 24,
      name: "Creditor, counselor",
      role: ["administrator"],
      avatar: "/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png",
      email: "counselor@creditoracademy.com",
      lastVisited: "37 days ago",
      groups: 4,
      superAdmin: true
    },
    {
      id: 25,
      name: "Hashim, Daniyal",
      role: ["administrator"],
      avatar: "/lovable-uploads/9fce6a44-d177-48aa-848b-8454dfa6ca7e.png",
      email: "daniyal.hashim@example.com",
      lastVisited: "6 days ago",
      groups: 4,
      superAdmin: true
    },
    {
      id: 26,
      name: "Javed, Farah",
      role: ["administrator"],
      avatar: "/lovable-uploads/a9e707a6-09a6-4f71-83fa-dfdc4e52cb13.png",
      email: "farah.javed@example.com",
      lastVisited: "Never",
      groups: 4,
      superAdmin: true
    },
    {
      id: 27,
      name: "Kumar, Nikhil",
      role: ["administrator"],
      avatar: "/lovable-uploads/172887ec-721f-41fe-8b85-47de3f4e0499.png",
      email: "nikhil.kumar@example.com",
      lastVisited: "30 days ago",
      groups: 4,
      superAdmin: true
    },
    {
      id: 28,
      name: "Friend One",
      role: ["friends"],
      avatar: "/lovable-uploads/2e656932-0755-44b1-807b-2b0a175c1d9b.png",
      email: "friend.one@example.com",
      lastVisited: "5 days ago",
      groups: 2
    },
    {
      id: 29,
      name: "Friend Two",
      role: ["friends"],
      avatar: "/lovable-uploads/a9e707a6-09a6-4f71-83fa-dfdc4e52cb13.png",
      email: "friend.two@example.com",
      lastVisited: "2 days ago",
      groups: 3
    },
    {
      id: 30,
      name: "Archived User",
      role: ["archived"],
      avatar: "/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png",
      email: "archived.user@example.com",
      lastVisited: "60 days ago",
      groups: 0,
      archived: true
    }
  ]);
  
  const [selectedRole, setSelectedRole] = useState('all');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter users based on selected role
  const getFilteredUsers = () => {
    if (selectedRole === 'all') {
      return users;
    }
    return users.filter(user => user.role.includes(selectedRole));
  };

  const filteredUsers = getFilteredUsers();
  
  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  
  // Add user function
  const addUser = (user) => {
    const newUser = {
      ...user,
      id: users.length + 1
    };
    setUsers([...users, newUser]);
  };

  // Update user function
  const updateUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  // Delete user function
  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // Add award to users function
  const addAwardToUsers = (userIds, award) => {
    setUsers(users.map(user => {
      if (userIds.includes(user.id)) {
        return {
          ...user,
          awards: [...(user.awards || []), award]
        };
      }
      return user;
    }));
  };
  
  return (
    <UserFilterContext.Provider
      value={{
        users,
        filteredUsers,
        selectedRole,
        setSelectedRole,
        isFilterMenuOpen,
        setIsFilterMenuOpen,
        totalPages,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        addUser,
        updateUser,
        deleteUser,
        addAwardToUsers
      }}
    >
      {children}
    </UserFilterContext.Provider>
  );
}

export function useUserFilter() {
  const context = useContext(UserFilterContext);
  if (context === undefined) {
    throw new Error('useUserFilter must be used within a UserFilterProvider');
  }
  return context;
}