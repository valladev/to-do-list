/* eslint-disable react/prop-types */
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import axios from "axios";

export default function Task({ taskData, setTaskData, setTaskCompleted, config, }) {
  const handleTaskCompletion = async (taskId) => {
    try {
      setTaskData((prevTaskData) => {
        const updatedTasks = prevTaskData.tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, completed: !task.completed };
          }
          return task;
        });

        setTaskCompleted(updatedTasks.filter((task) => task.completed).length);

        return { ...prevTaskData, tasks: updatedTasks };
      });

      await axios.put(`http://localhost:3000/tasks/${taskId}`, taskData, config);

    } catch (error) {
      console.error("Erro ao marcar a tarefa como concluída:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    console.log(taskId);
    try {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`, config);

      // const tasksResponse = await axios.get('http://localhost:3000/tasks', config);
      // setTaskData(tasksResponse.data);

      // const totalCompletedResponse = await axios.get('http://localhost:3000/tasks/total-completed', config);
      // setTaskCompleted(totalCompletedResponse.data.totalCompleted);
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  return (
    <>
      {taskData && taskData.slice().reverse().map((task) => (
        !task.completed ? (
          <div key={task.id} className='border border-[#333333] bg-[#262626] h-20 rounded-xl flex justify-start items-center p-4'>
            <div className="flex justify-between w-full">
              <div className='flex items-center space-x-2'>
                <Checkbox
                  className="rounded-full w-6 h-6"
                  checked={task.completed}
                  id={task.id}
                  onClick={() => handleTaskCompletion(task.id)}
                />
                <p
                  className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xl text-[#F2F2F2]"
                >
                  {task.description}
                </p>
              </div>
              <Button
                variant={"ghost"}
                onClick={handleDeleteTask(task.id)}>
                <Trash2 color='#D9D9D9' />
              </Button>
            </div>
          </div>)
          :
          (
            <div key={task.id} className='border border-[#333333] bg-[#262626] h-20 rounded-xl flex justify-start items-center p-4'>
              <div className="flex justify-between w-full">
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    className="rounded-full w-6 h-6"
                    id={task.id}
                    checked={task.completed}
                    onClick={() => handleTaskCompletion(task.id)}
                  />
                  <p
                    className={`font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xl  text-[#808080] ${task.completed ? 'line-through' : ''
                      }`}
                  >
                    {task.description}
                  </p>
                </div>
                <Button variant={"ghost"} onClick={() => handleDeleteTask(task.id)}>
                  <Trash2 color='#D9D9D9' />
                </Button>
              </div>
            </div>
          )
      ))}
    </>
  )
}