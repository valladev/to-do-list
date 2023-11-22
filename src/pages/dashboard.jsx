import { UserNav } from "@/components/user-nav";
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import CardsInfo from '@/components/cards-info';
import axios from 'axios';
import { Send } from 'lucide-react';
import List from '../components/list';
import Task from "../components/task";

export default function DashboardPage() {
  const token = sessionStorage.getItem('token');

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [totalCategories, setTotalCategories] = useState(0);
  const [taskData, setTaskData] = useState([]);
  const [listData, setListData] = useState([]);
  const [listDataTotal, setListDataTotal] = useState([]);
  const [categoryData, setCategoryData] = useState([])
  const [newTaskName, setNewTaskName] = useState('');
  const [newListName, setNewListName] = useState('');
  const [taskCompleted, setTaskCompleted] = useState(0);
  const [listCompleted, setListCompleted] = useState(0);
  const [listsTaskData, setListsTaskData] = useState([]);

  const [firstNameInitial, setFirstNameInitial] = useState('');
  const [lastNameInitial, setLastNameInitial] = useState('');

  function formatName() {
    const nameParts = name.split(' ');
    const firstNameInitial = nameParts.length > 0 ? nameParts[0].charAt(0) : '';
    const lastNameInitial = nameParts.length > 1 ? nameParts[1].charAt(0) : '';

    setFirstNameInitial(firstNameInitial);
    setLastNameInitial(lastNameInitial);
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleCreateTask = async () => {
    try {
      const newTask = {
        description: newTaskName,
        completed: false,
      };

      await axios.post('http://localhost:3000/tasks', newTask, config);

      window.location.reload();

      setNewTaskName('');

    } catch (error) {
      console.error("Erro ao criar uma nova tarefa:", error);
    }
  };

  const handleCreateList = async () => {
    try {
      const newList = {
        name: newListName,
        userId: userId
      };

      await axios.post('http://localhost:3000/todo-lists', newList, config);

      window.location.reload();

      setNewTaskName('');

    } catch (error) {
      console.error("Erro ao criar uma nova tarefa:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const userResponse = await axios.get('http://localhost:3000/me', config)
      const tasksResponse = await axios.get('http://localhost:3000/tasks', config)
      const totalCategoriesResponse = await axios.get('http://localhost:3000/categories', config)
      const listsResponse = await axios.get('http://localhost:3000/todo-lists', config)
      const { id, name, email } = userResponse.data;

      formatName(name)

      setUserId(id);
      setUserName(name);
      setUserEmail(email)
      setTotalCategories(totalCategoriesResponse.data)
      setTaskData(tasksResponse.data)
      setListData(listsResponse.data.lists)
      setTaskCompleted(tasksResponse.data.totalCompleted)
      setListCompleted(listsResponse.data.totalCompleted)
      setListDataTotal(listsResponse.data)
      setCategoryData(totalCategoriesResponse.data)

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData()
  }, [])
  return (
    <div className='bg-[#1A1A1A] flex justify-center'>
      <div className="flex-col md:flex w-[1200px]">
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
            totalLists={listDataTotal}
            updateTaskData={setTaskData}
          />

          <Separator className='my-8' />

          <form className='flex gap-4 h-12'>
            <Input
              required
              className='h-full' placeholder='Adicione uma nova task'
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
            <Button
              className='h-full w-24 text-lg'
              onClick={handleCreateTask}
            >
              <Send />
            </Button>
          </form>

          <Separator className='my-8' />

          <form className='flex gap-4 h-12'>
            <Input
              required
              className='h-full' placeholder='Adicione uma nova list'
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <Button
              className='h-full w-24 text-lg'
              onClick={handleCreateList}
            >
              <Send />
            </Button>
          </form>

          <div className='flex items-start bg pt-8 gap-2 flex-col md:flex-row justify-between' >
            <div className='flex items-center gap-2 text-xl'>
              <p className='text-secondary-foreground font-semibold'>Tasks Concluídas</p>
              <div className='w-10 bg-[#333333] flex justify-center items-center rounded-3xl'>
                <p className='text-white'>{taskCompleted}</p>
              </div>
            </div>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue className="text-white" placeholder="Categorias" />
              </SelectTrigger>
                <SelectContent>
                  <SelectItem></SelectItem>
                </SelectContent>
            </Select>



            <div className='flex items-center gap-2 text-xl'>
              <p className='text-secondary-foreground font-semibold'>Listas Concluídas</p>
              <div className='w-10 bg-[#333333] flex justify-center items-center rounded-3xl'>
                <p className='text-white'>{listCompleted}</p>
              </div>
            </div>
          </div>

          <List
            listData={listData}
            config={config}
            setListsTaskData={setListsTaskData}
            setTaskCompleted={setTaskCompleted}
          />

          <Task
            taskData={taskData.tasks}
            setTaskData={setTaskData}
            setTaskCompleted={setTaskCompleted}
            config={config}
          />

        </div>
      </div>
    </div>
  )
}