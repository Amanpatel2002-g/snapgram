import { Button } from "@/components/ui/button"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signUpValidationSchema } from "@/lib/validations"
import { Loader } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
// import { createUserAccount } from "@/lib/appwrite/api"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/qeuriesAndMutations"
import { useUserContext } from "@/context/AuthContext"


const SignUpForm = () => {
  // const isCreatingUser = false;

  const { toast } = useToast();

  const { checkAuthUser } = useUserContext(); 

  const {mutateAsync:createUserAccount, isPending:isCreatingUser} = useCreateUserAccount();


  const { mutateAsync: signInAccount} = useSignInAccount()
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signUpValidationSchema>>({
    resolver: zodResolver(signUpValidationSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signUpValidationSchema>) {
    const newUser = await createUserAccount(values);
    if (!newUser) {
      return toast({
        title: 'Sign up falied. Please try again'
      });
    }

    const session = await signInAccount({
      email: values.email, password: values.password
    })

    if (!session) {
      return toast({title:'sign Up falied, please try again', variant:"destructive"})
    }

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate('/home')
    }
    else {
      toast({ title: 'sign up failed. please try again', variant:"destructive" });
    }
  }
  return (
    <Form {...form}>
      <div className="sm:w-[420px] flex-center flex-col">
        <img src="/public/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-2">create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">To use snapgram, please enter your details</p>


        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="username" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                <Loader />
              </div>) : "signup"}
          </Button>
          <p className="text-small-regular  text-light-2  text-center mt-2">Already have an account?
            <Link to={"/sign-in"} className="text-primary-500 text-small-semibold ml-1">Log In</Link>
          </p>
        </form>
      </div>
    </Form>

  )
}

export default SignUpForm