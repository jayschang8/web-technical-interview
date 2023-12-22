import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Home: NextPage = () => {
  const { push } = useRouter()

  useEffect(() => {
    push("/homes")
  }, [push])

  return <></>
}

export default Home
