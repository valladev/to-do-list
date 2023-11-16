import * as React from 'react';

import { CalendarCheck2, Layers3, List, PlusCircle } from 'lucide-react';

import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
   CardFooter,
} from "@/components/ui/card";

export default function CardsAdd() {
   return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
      <Card className='bg-secondary border-[#262626]'>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <List color='#ffffff' />
         </CardHeader>
         <CardContent>
            <div className="text-2xl text-white font-bold">Criar lista</div>
         </CardContent>
      </Card>

      <Card className='bg-secondary border-[#262626]'>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CalendarCheck2 color='#ffffff' />
         </CardHeader>
         <CardContent>
            <div className="text-2xl font-bold text-white">Criar task</div>
         </CardContent>
      </Card>

      <Card className='bg-secondary border-[#262626]'>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Layers3 color='#ffffff' />
         </CardHeader>
         <CardContent>
            <div className="text-2xl font-bold text-white">Adicionar categoria</div>
         </CardContent>
      </Card>
   </div>
   )
}