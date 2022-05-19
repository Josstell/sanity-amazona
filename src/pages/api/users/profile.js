import axios from "axios"
import nc from "next-connect"
import { signToken, isAuth } from "../../../utils/auth"

const handler = nc()

handler.use(isAuth)
handler.put(async (req, res) => {
	const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
	const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
	const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN
	await axios.post(
		`https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}`,
		{
			mutations: [
				{
					patch: {
						id: req.user._id,
						set: {
							name: req.body.name,
							email: req.body.email,
						},
					},
				},
			],
		},
		{
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${tokenWithWriteAccess}`,
			},
		}
	)

	const user = {
		_id: req.user._id,
		name: req.body.name,
		email: req.body.email,
		isAdmin: req.user.isAdmin,
	}
	const token = signToken(user)
	res.send({ ...user, token })
})

export default handler
