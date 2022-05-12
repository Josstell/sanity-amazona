import { Typography } from "@mui/material"
import Head from "next/head"
import Image from "next/image"
import styles from "../../styles/Home.module.css"
import Layout from "../components/layout"

export default function Home() {
	return (
		<div>
			<Head>
				<title>Sanity Amazona</title>
				<meta
					name="description"
					content="The Ecommerce website by next and sanity"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Layout>Sanity amazona</Layout>
		</div>
	)
}
