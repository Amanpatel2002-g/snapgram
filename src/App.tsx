import { Route, Routes } from 'react-router-dom'
import './globals.css'
import SignInForm from './_auth/forms/SignInForm'
import SignUpForm from './_auth/forms/SignUpForm'
import AuthLayout from './_auth/AuthLayout'
import { Toaster } from "@/components/ui/toaster"
import RootLayout from './_root/RootLayout'
import { Home } from 'lucide-react'
export const App = () => {
    return (
        <main className='flex h- screen'>
            <Routes>
                {/* public Routes */}
                <Route element={<AuthLayout />}>
                    <Route path='/sign-in' element={<SignInForm />} />
                    <Route path='/sign-up' element={<SignUpForm />} />
                </Route>
                {/* private Routes */}
                <Route element={<RootLayout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
            <Toaster/>
        </main>
    );
}

