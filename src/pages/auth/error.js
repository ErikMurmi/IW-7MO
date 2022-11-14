import Link from "next/link";
import { useRouter } from "next/router";

export default function Error({error}){
    
    const {query} = useRouter()
    console.log(query)
    return(
        <>
        <h2>
            Error Status 401
        </h2>
        <p>{query.error}</p>
        <Link href='/'>Volver al inicio</Link>
        </>
    )
}