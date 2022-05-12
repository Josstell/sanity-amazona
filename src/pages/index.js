import { Alert, CircularProgress, Grid } from "@mui/material"
import Head from "next/head"
import { useEffect, useState } from "react"

import Layout from "../components/layout"
import ProductItem from "../components/ProductItem"
import client from "../utils/sanityClient"

export default function Home() {
	const [state, setState] = useState({
		products: [],
		loading: true,
		error: "",
	})

	const { loading, products, error } = state

	useEffect(() => {
		const fetchData = async () => {
			try {
				const products = await client.fetch(`*[_type == "product"]`)
				setState({ products, loading: false })
			} catch (err) {
				setState({ loading: false, error: err.message })
			}
		}
		fetchData()
	}, [])
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
			<Layout>
				{loading ? (
					<CircularProgress />
				) : error ? (
					<Alert variant="danger">{error}</Alert>
				) : (
					<Grid container spacing={3}>
						{products?.map((product) => (
							<Grid item md={4} key={product.slug}>
								<ProductItem product={product}></ProductItem>
							</Grid>
						))}
					</Grid>
				)}
			</Layout>{" "}
		</div>
	)
}
