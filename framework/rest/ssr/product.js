import { QueryClient } from "react-query";
import { fetchProduct, fetchRelatedProducts } from "../products/products.query";

export async function getStaticPaths () {
      return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}


export const getStaticProps = async ({params}) => {
    const slug = params.slug;

   try {
        const product = await fetchProduct(slug);
        return {
            props: {
                product,
            },
             revalidate: 60,
        }
   } catch (error) {
       return {
           notfound: true
       }
   }
}