import { initializeApp } from "firebase/app"
import type { DocumentData } from "firebase/firestore/lite"
import { collection, getDocs, getFirestore } from "firebase/firestore/lite"
import type { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Card from "../components/Card"
import config from "../config"

const app = initializeApp(config.firebase)
const db = getFirestore(app)

const Homes: NextPage = () => {
  const { push } = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [homes, setHomes] = useState<DocumentData[]>([])

  useEffect(() => {
    if (localStorage.getItem("user") === "false") {
      push("/login")
    } else {
      setAuthenticated(true)
      getHomes()
    }
  }, [push])

  const getHomes = async () => {
    const homesCol = collection(db, "homes")
    const homeSnapshot = await getDocs(homesCol)
    const homeList = homeSnapshot.docs.map((doc) => doc.data())
    setHomes(homeList)
  }

  return authenticated ? (
    <div className="bg-gray-200 h-screen pt-5">
      <Head>
        <title>View Homes</title>
        <meta name="description" content="Homes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex mx-4 flex-col xl:flex-row">
          {homes.map((home) => {
            return <Card getHomes={getHomes} home={home} key={home.id} />
          })}
        </div>
      </main>
    </div>
  ) : (
    <></>
  )
}

export default Homes
