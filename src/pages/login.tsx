import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import type { ChangeEvent, SyntheticEvent } from "react"
import { useEffect, useState } from "react"
import userData from "../../data/users.json"

const Login: NextPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { push } = useRouter()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [redirect, setRedirect] = useState(false)

  const validate = (): void => {
    const matches = userData.filter(
      (user) => user.email === email && user.password === password
    )
    if (matches.length > 0) {
      localStorage.setItem("user", matches[0].email)
      setError("")
      setSuccess("Authenticated. Redirecting...")
      setRedirect(true)
    } else {
      localStorage.setItem("user", "false")
      setError("Invalid credentials")
    }
  }

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault()
    validate()
  }

  useEffect(() => {
    localStorage.setItem("user", "false")
    if (redirect) {
      const timer = setTimeout(() => {
        push("/homes")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [redirect, push])

  return (
    <div>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Sign In" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="h-screen flex">
          <div className="w-[55%]">
            <div className="ml-4 mt-4">
              <Image src="/logo.png" alt="logo" width={150} height={42} />
            </div>
            <div className="w-[400px] mx-auto mt-32 p-4">
              <h1 className="text-xl font-bold mb-2">Sign In</h1>
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
              <form onSubmit={handleSubmit}>
                <input
                  className="mb-8 w-full border px-3 py-2 mt-4"
                  placeholder="Enter email"
                  type="email"
                  onInput={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
                <input
                  className="block mb-8 w-full px-3 py-2 border"
                  placeholder="Enter password"
                  type="password"
                  width="100%"
                  onInput={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
                <button className="block w-full text-white py-2 bg-gray-400 hover:bg-gray-300 active:bg-gray-200">
                  Login
                </button>
              </form>
              {success && <p className="text-green-600 mt-4">{success}</p>}
            </div>
          </div>
          <div className="relative w-[45%] h-[100%]">
            <Image src="/house2.jpeg" alt="home" layout="fill" />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login
