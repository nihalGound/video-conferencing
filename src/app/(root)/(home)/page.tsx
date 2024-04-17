import MeetingTypeList from "@/components/MeetingTypeList"

function Home() {
  return (
    <main className='flex flex-col md:gap-y-32 gap-y-10 md:w-full items-center overflow-x-hidden md:px-5'>
      <div className='h-[260px] w-[350px] md:w-full rounded-md bg-hero bg-cover flex flex-col items-start justify-between p-7'>
          <div className='flex justify-between items-center text-[#ECF0FF] text-sm w-fit gap-x-1 bg-[#FFFFFF0D] px-2 py-2 rounded-md'>
            <div>Upcoming Meeting at:</div>
            <div>12:30 PM</div>
          </div>
          <div>
            <div className="flex items-baseline gap-x-1">
              <div className="text-7xl font-bold text-white">12:40</div>
              <div className="text-white text-lg font-semibold uppercase">PM</div>
            </div>
            <div className="capitalize text-[#C9DDFF] text-xl">Friday, 29 March 2024</div>
          </div>
      </div>
      <MeetingTypeList />
    </main>
  )
}

export default Home