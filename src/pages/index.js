import { Alert, CircularProgress, Grid } from "@mui/material"
import Head from "next/head"
import axios from "axios"
import { useRouter } from "next/router"
import { useSnackbar } from "notistack"
import { useContext, useEffect, useState } from "react"
import Layout from "../components/layout"
import ProductItem from "../components/ProductItem"
import client from "../utils/sanityClient"

import { urlForThumbnail } from "../utils/image"
import { Store } from "../utils/Store"

export default function Home() {
	const {
		state: { cart },
		dispatch,
	} = useContext(Store)
	const router = useRouter()
	const { enqueueSnackbar } = useSnackbar()
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

	const addToCartHandler = async (product) => {
		const existItem = cart.cartItems.find((x) => x._id === product._id)
		const quantity = existItem ? existItem.quantity + 1 : 1
		const { data } = await axios.get(`/api/products/${product._id}`)
		if (data.countInStock < quantity) {
			enqueueSnackbar("Sorry. Product is out of stock", { variant: "error" })
			return
		}
		dispatch({
			type: "CART_ADD_ITEM",
			payload: {
				_key: product._id,
				name: product.name,
				countInStock: product.countInStock,
				slug: product.slug.current,
				price: product.price,
				image: urlForThumbnail(product.image),
				quantity,
			},
		})
		enqueueSnackbar(`${product.name} added to the cart`, {
			variant: "success",
		})
		router.push("/cart")
	}

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
								<ProductItem
									product={product}
									addToCartHandler={addToCartHandler}
								></ProductItem>{" "}
							</Grid>
						))}
					</Grid>
				)}
			</Layout>{" "}
		</div>
	)
}
