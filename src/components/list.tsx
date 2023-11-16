import * as React from 'react';

import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
   CardFooter,
} from "@/components/ui/card";

import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion"

export default function List() {
   return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 ">
         <Card className="col-span-4 bg-transparent border border-[#262626]">
            <CardHeader>
               <CardTitle className='text-white'>Listas</CardTitle>
            </CardHeader>
            <CardContent>
               <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                     <AccordionTrigger className='text-white'>Is it accessible?</AccordionTrigger>
                     <AccordionContent className='text-white'>
                        Yes. It adheres to the WAI-ARIA design pattern.
                     </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                     <AccordionTrigger className='text-white'>Is it styled?</AccordionTrigger>
                     <AccordionContent className='text-white'>
                        Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                     </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                     <AccordionTrigger className='text-white'>Is it animated?</AccordionTrigger>
                     <AccordionContent className='text-white'>
                        Yes. It&apos;s animated by default, but you can disable it if you
                        prefer.
                     </AccordionContent>
                  </AccordionItem>
               </Accordion>

            </CardContent>
         </Card>
      </div>
   )
}