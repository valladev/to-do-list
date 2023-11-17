/* eslint-disable react/prop-types */

import { CalendarCheck2, Layers3, List } from 'lucide-react';

import {
   Card,
   CardContent,
   CardHeader,
   CardTitle
} from "@/components/ui/card";

export default function CardsInfo({ totalCategories, totalTasks, totalLists }) {
   return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
         <Card className='bg-transparent border-[#262626]'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

               <CardTitle className="text-sm text-white font-medium">
                  Total de listas
               </CardTitle>

               <List color='#ffffff' />
            </CardHeader>

            <CardContent>
               <div className="text-2xl text-white font-bold">{totalLists.total}</div>
            </CardContent>
         </Card>

         <Card className='bg-transparent border border-[#262626]'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

               <CardTitle className="text-sm font-medium text-white">
                  Total de tasks
               </CardTitle>

               <CalendarCheck2 color='#ffffff' />
            </CardHeader>

            <CardContent>
               <div className="text-2xl font-bold text-white">{totalTasks.total}</div>
            </CardContent>
         </Card>

         <Card className='bg-transparent border border-[#262626]'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

               <CardTitle className="text-sm font-medium text-white">Total de categorias</CardTitle>

               <Layers3 color='#ffffff' />
            </CardHeader>

            <CardContent>
               <div className="text-2xl font-bold text-white">{totalCategories.total}</div>
            </CardContent>
         </Card>
      </div>
   )
}