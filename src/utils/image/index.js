import ImageUrlBuilder from "@sanity/image-url"
import client from "../sanityClient"

function urlForThumbnail(source) {
	return ImageUrlBuilder(client).image(source).width(300).url()
}

export { urlForThumbnail }
