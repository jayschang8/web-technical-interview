import type { NextPage } from "next"
import Head from "next/head"
import homeData from "../../data/homes.json"
import Card from "../components/Card"

const Homes: NextPage = () => {
  return (
    <div className="bg-gray-200 pb-96 pt-5">
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
  )
}

export default Homes
