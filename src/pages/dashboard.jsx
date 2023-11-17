import { useEffect } from 'react';
import { UserNav } from "@/components/user-nav";

import ListTasks from '@/components/list';
import CardsAdd from '@/components/cards-add';
import CardsInfo from '@/components/cards-info';
import axios from 'axios';
import { useState } from 'react';

export default function DashboardPage() {
   const token = sessionStorage.getItem('token');

   const [userName, setUserName] = useState('');
   const [userEmail, setUserEmail] = useState('');
   const [totalCategories, setTotalCategories] = useState(0);
   const [taskData, setTaskData] = useState([]);
   const [listData, setListData] = useState([]);

   const [firstNameInitial, setFirstNameInitial] = useState('');
   const [lastNameInitial, setLastNameInitial] = useState('');

   const fetchUserData = async () => {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };

         const userResponse = await axios.get('http://localhost:3000/me', config);

         const tasksResponse = await axios.get('http://localhost:3000/tasks', config);

         const totalCategoriesResponse = await axios.get('http://localhost:3000/categories/total', config);
         const listsResponse = await axios.get('http://localhost:3000/todo-lists', config);
         
         const { name, email } = userResponse.data;
         
         const nameParts = name.split(' ');
         
         const firstNameInitial = nameParts.length > 0 ? nameParts[0].charAt(0) : '';
         const lastNameInitial = nameParts.length > 1 ? nameParts[1].charAt(0) : '';
         
         setUserName(name);
         setUserEmail(email)
         setTotalCategories(totalCategoriesResponse.data)
         setTaskData(tasksResponse.data)
         setListData(listsResponse.data)
         setFirstNameInitial(firstNameInitial);
         setLastNameInitial(lastNameInitial);

      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      fetchUserData()
   }, [])
   return (
      <>
         <div className="flex-col md:flex bg-[#1A1A1A] h-screen">
            <div className="border-b border-[#262626]">
               <div className="flex h-16 items-center px-4">
                  <img src="/src/assets/logo.svg" alt="" />
                  <div className="ml-auto flex items-center space-x-4">
                     <p className='text-white'>Bem-vindo, <span className='font-mono text-primary'>{userName}</span></p>
                     <UserNav 
                        firstNameInitial={firstNameInitial}
                        lastNameInitial={lastNameInitial}
                        userEmail={userEmail}
                        userName={userName}
                        />
                  </div>
               </div>
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">
               <div className="flex items-center justify-between space-y-2">
                  <h2 className="text-3xl text-primary font-bold tracking-tight">Dashboard</h2>
               </div>

               <CardsInfo
                  totalCategories={totalCategories}
                  totalTasks={taskData}
                  totalLists={listData}
               />

               <CardsAdd />

               <ListTasks />
            </div>
         </div>
      </>
   )
}