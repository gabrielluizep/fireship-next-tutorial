import { useRouter } from 'next/router'
import Image from 'next/image'
import Head from 'next/head'

export default function Car({ car }) {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <h1>Hello {id}</h1>
      <Image src={car.image} alt="Lamborghini image" width="400px" height="300px" />
    </>
  )
}

// SSR means Server Side Rendering, this features renders each
// page at each request made by the user

// export async function getServerSideProps({ params }) {
//   const req = await fetch(`http://localhost:3000/${params.id}.json`)
//   const data = await req.json()

//   return {
//     props: { car: data },
//   }
// }

// SSG means Static Site Generation, this feature generates the
// Site at build time, beeing so much efficient but only aplicable
// to small apps that doesnt have so much routes or dynamic content

export async function getStaticProps({ params }) {
  const req = await fetch(`http://localhost:3000/${params.id}.json`)
  const data = await req.json()

  return {
    props: { car: data },
  }
}

export async function getStaticPaths() {
  const req = await fetch('http://localhost:3000/cars.json')
  const data = await req.json()

  const paths = data.map((car) => {
    return { params: { id: car } }
  })

  return {
    paths,
    fallback: false,
  }
}
