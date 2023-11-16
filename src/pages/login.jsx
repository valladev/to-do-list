import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"

import { XCircle } from "lucide-react";
import { Loader2 } from "lucide-react";

import axios from "axios";

export default function Login() {
   const [errosInputs, setErrorInputs] = useState();
   const [errorBool, setErrorBool] = useState(false)
   const [isLoadingSave, setIsLoadingSave] = useState(false)

   const navigate = useNavigate()
   const {
      register,
      handleSubmit,
      //watch,
      formState: { errors },
   } = useForm()


   const onSubmit = async (data) => {
      event.preventDefault();
      setIsLoadingSave(true)
      try {
         const response = await axios.post('http://localhost:3000/login', {
            email: data.email,
            password: data.password
         });

         const token = response.data.access_token;
         sessionStorage.setItem('token', token);

         // eslint-disable-next-line no-undef

         navigate('/dashboard');

         setErrorInputs(false);
         setErrorBool(true)

         toast({
            variant: "save",
            title: "Login feito com sucesso!",
          })
      } catch (error) {
         setErrorBool(true)
         setErrorInputs(error.response.data.message);
         setIsLoadingSave(true)
      } finally {
         setIsLoadingSave(false)
      }
      setIsLoadingSave(false);
   };

   return (
      <div className="flex justify-center items-center h-screen bg-no-repeat bg-cover " style={{ backgroundImage: 'url("/src/assets/backgroundLogin.jpg"' }}>
         <div className="border border-[#262626] bg-[#1A1A1A] rounded-2xl drop-shadow-2xl">

            <form onSubmit={handleSubmit(onSubmit)} className="w-80 sm:w-[360px] md:w-[400px]  flex flex-col justify-center gap-6 p-8 ">
               <img className="w-48" src="/src/assets/logo.svg" alt="" />
               <h1 className="text-3xl font-bold text-primary font-poppins">Faça o login para acessar sua conta.</h1>
               <div className="flex flex-col gap-1 w-full" >
                  <p className="text-muted-foreground text-sm">Digite seu email</p>

                  <Input
                     className={`text-white ${errors?.email?.type === "required" ? "border-red-500" : ''}`}
                     type="email"
                     name="email"
                     {...register("email", { required: true })}
                  />
                  {errors.email && <span className="text-red-500 text-sm">Email obrigatório</span>}
               </div>


               <div className="flex flex-col gap-1 w-full">
                  <p className="text-muted-foreground text-sm">Digite sua senha</p>
                  <Input
                     className={`text-white ${errors?.password?.type === "required" ? "border-red-500" : ''}`}
                     type="password"
                     name="password"
                     {...register("password", { required: true })}
                  />
                  {errors.password && <span className="text-red-500 text-sm">Senha obrigatória</span>}


                  <div className="mt-2 flex justify-between gap-2">
                     <div className="flex items-center gap-2">
                        <Checkbox />
                        <p className="text-muted-foreground text-sm">Lembrar-me</p>
                     </div>
                     <p className="text-primary cursor-pointer text-sm">Esqueceu a senha?</p>
                  </div>
               </div>

               {errorBool ?
                  <Alert variant={"destructive"} className="bg-red-500">
                     <XCircle color="#ffffff" />
                     <AlertTitle className="text-white">Erro ao fazer login!</AlertTitle>
                     <AlertDescription className="text-white">
                        {errosInputs}
                     </AlertDescription>
                  </Alert> : ''
               }

               {!isLoadingSave ?
                  <Button type="submit">
                     Fazer login
                  </Button>
                  :
                  <Button type="submit" disabled>
                     <Loader2 Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     Entrando...
                  </Button>
               }

               <p className="text-muted-foreground text-center">Ainda não tem uma conta? <span className="text-primary cursor-pointer">Criar conta</span></p>
            </form>
         </div>
      </div>
   )
}
