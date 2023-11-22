import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axios from "axios";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import Task from "../components/task";

export default function List({ config, listData, setListsTaskData, setTaskCompleted }) {
  const [newTaskNames, setNewTaskNames] = useState({});

  const handleCreateTaskInList = async (listId) => {
    try {
      const newTask = {
        description: newTaskNames[listId] || '',
        completed: false,
      };

      const response = await axios.post(`http://localhost:3000/todo-lists/${listId}`, newTask, config);
      const createdTask = response.data;

      setListsTaskData((prevData) => {
        if (Array.isArray(prevData)) {
          const updatedLists = prevData.map((list) => {
            if (list.id === listId) {
              return {
                ...list,
                tasks: [...list.tasks, createdTask],
              };
            }
            return list;
          });
          return updatedLists;
        } else {
          console.error("Erro: prevData não é um array");
          return prevData;
        }
      });

      setNewTaskNames((prevNames) => ({
        ...prevNames,
        [listId]: '',
      }));
    } catch (error) {
      console.error("Erro ao criar uma nova tarefa na lista:", error);
    }
  };

  const handleTaskCompletion = async (listId, taskId) => {
    try {
      setListsTaskData((prevData) => {
        if (Array.isArray(prevData)) {
          const updatedLists = prevData.map((list) => {
            if (list.id === listId) {
              const updatedTasks = list.tasks.map((task) => {
                if (task.id === taskId) {
                  return { ...task, completed: !task.completed };
                }
                return task;
              });
              return { ...list, tasks: updatedTasks };
            }
            return list;
          });
          return updatedLists;
        } else {
          console.error("Erro: prevData não é um array");
          return prevData;
        }
      });

      await axios.put(`http://localhost:3000/tasks/${taskId}`, { completed: true }, config);
    } catch (error) {
      console.error("Erro ao marcar a tarefa como concluída:", error);
    }
  };
  
  return (
    <div className="flex flex-col gap-4">
      {listData &&
        listData.map((list) => (
          <Accordion key={list.id} type="single" collapsible>
            <AccordionItem value={list.id}>
              <AccordionTrigger className="text-white font-semibold text-xl px-2">{list.name}</AccordionTrigger>
              <form className='flex gap-4 p-2 h-16'>
                <Input
                  required
                  className='h-full'
                  placeholder='Adicione uma nova task'
                  value={newTaskNames[list.id] || ''}
                  onChange={(e) => {
                    setNewTaskNames((prevNames) => ({
                      ...prevNames,
                      [list.id]: e.target.value,
                    }));
                  }}
                />
                <Button
                  className='h-full w-24 text-lg'
                  onClick={(e) => {
                    handleCreateTaskInList(list.id);
                    e.preventDefault();
                  }}
                >
                  <Send />
                </Button>
              </form>
              <AccordionContent className="flex flex-col gap-2">
                <Task
                  taskData={list.tasks}
                  setTaskData={setListsTaskData}
                  setTaskCompleted={(taskId) => handleTaskCompletion(taskId, list.id)}
                  config={config}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
    </div>
  );
}

List.propTypes = {
  config: PropTypes.object.isRequired,
  listData: PropTypes.array.isRequired,
  setListsTaskData: PropTypes.func.isRequired,
  setTaskCompleted: PropTypes.func.isRequired,
};
