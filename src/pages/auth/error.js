import Link from "next/link";

export default function Error(){
    return(
        <>
        <h1>
            Credenciales inválidas
        </h1>
        <Link href='/users/new'>Regístrate aquí</Link>
        </>
    )
}