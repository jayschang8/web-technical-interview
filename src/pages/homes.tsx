import type { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import homeData from "../../data/homes.json"
import Card from "../components/Card"

const Homes: NextPage = () => {
  const { push } = useRouter()
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("user") === "false") {
      push("/login")
    } else {
      setAuthenticated(true)
    }
  }, [push])

  return authenticated ? (
    <div className="bg-gray-200 h-screen pt-5">
      <Head>
        <title>View Homes</title>
        <meta name="description" content="Homes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex mx-4 flex-col xl:flex-row">
          {homeData.map((home) => {
            return <Card home={home} key={home.id} />
          })}
        </div>
      </main>
    </div>
  ) : (
    <></>
  )
}

export default Homes
