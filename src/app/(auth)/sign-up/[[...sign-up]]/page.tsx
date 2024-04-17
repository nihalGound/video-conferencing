import {SignUp} from "@clerk/nextjs"

const page = () => {
  return (
    <main className="flex justify-center items-center h-screen w-full">
      <SignUp />
    </main>
  )
}

export default page