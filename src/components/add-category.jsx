/* eslint-disable react/prop-types */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { List } from "lucide-react"

export default function AddCategory({ textModel, textButtonNext, textTitleModel }) {
  return (
    <div>
      <Button className="h-20 w-full ">
        <AlertDialog>
          <AlertDialogTrigger className="w-full h-full text-xl flex justify-center items-center gap-2">
          <List size={26} />
            {textModel}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{textTitleModel}</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
              <p>Nome da lista</p>
              <Input />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>{textButtonNext}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Button>

    </div>
  )
}
