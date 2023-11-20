import { Button } from "@/components/ui/button"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signInValidationSchema } from "@/lib/validations"
import { Loader } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
// import { createUserAccount } from "@/lib/appwrite/api"
import { useToast } from "@/components/ui/use-toast"
import { useSignInAccount } from "@/lib/react-query/qeuriesAndMutations"
import { useUserContext } from "@/context/AuthContext"


const SignInForm = () => {
  // const isCreatingUser = false;

  const { toast } = useToast();

  const { checkAuthUser,isLoading:isUserLoading } = useUserContext(); 


  const { mutateAsync: signInAccount, isPending:isLoading } = useSignInAccount()
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signInValidationSchema>>({
    resolver: zodResolver(signInValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signInValidationSchema>) {

    const session = await signInAccount({
      email: values.email, password: values.password
    })

    if (!session) {
      return toast({ variant:'destructive', title:'sign in falied, please try again'})
    }

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate('/home')
    }
    else {
      toast({ variant:'destructive',title: 'sign In failed. please try again'});
    }
  }
  return (
    <Form {...form}>
      <div className="sm:w-[420px] flex-center flex-col">
        <img src="/public/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-2">Login into your account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">Welcome back!, please enter your details</p>


        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="Email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isUserLoading || isLoading? (
              <div className="flex-center gap-2">
                <Loader />
              </div>) : "signIn"}
          </Button>
          <p className="text-small-regular  text-light-2  text-center mt-2">New to Snapgram! 
            <Link to={"/sign-Up"} className="text-primary-500 text-small-semibold ml-1">Sign Up</Link>
          </p>
        </form>
      </div>
    </Form>

  )
}

export default SignInForm