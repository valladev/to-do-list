import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen bg-cover" style={{ backgroundImage: 'url("/src/assets/backgroundLogin.jpg"' }}>
      <div className="flex-col items-center justify-center w-[70%] h-[80%] bg-white rounded-xl">
        <h1 className="font-light text-3xl mt-6 text-center">
          <span className="font-semibold">ToDo</span>list
        </h1>

        <div className="flex items-center justify-around w-full ">
          <div className="w-64 flex flex-col gap-10">

            <div>
              <p className="text-muted-foreground">Digite seu email</p>
              <Input />
            </div>

            <div>
              <p className="text-muted-foreground">Digite sua senha</p>
              <Input />

              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <p className="text-muted-foreground">Lembrar-me</p>
                </div>
                <p className="text-primary cursor-pointer">Esqueceu a senha?</p>
              </div>
            </div>

            <Button >
              Fazer login
            </Button>

            <Separator />
          </div>

          <div className="border border-gray-100 h-80"></div>

          <div className="w-1/2">
            <img src="/src/assets/Reading list-rafiki.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
