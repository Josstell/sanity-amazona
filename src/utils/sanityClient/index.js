import sanityClient from "@sanity/client"

const client = sanityClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	apiVersion: "2021-08-31", // use a UTC date string
	useCdn: true,
})

export default client
