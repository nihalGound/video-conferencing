import Image from 'next/image'

interface meeting{
  icon:string;
  title:string;
  subtitle:string;
  classname:string;
  onclick:()=>void;
}

const MeetingType = ({icon,title,subtitle,classname,onclick}:meeting) => {
  return (
    <div className={`flex p-5 rounded-lg ${classname} w-[350px] min-h-[200px]  md:w-[305px] flex-col justify-between items-start cursor-pointer hover:bg-[#ff742eec]`}
    onClick={onclick}>
                <div className="rounded-md bg-[#FFFFFF5E] text-white grid place-items-center p-2">
                    <Image 
                    src={icon}
                    alt={icon}
                    height={30}
                    width={30}
                    />
                </div>
                <div className="flex flex-col gap-y-2 text-white">
                    <div>{title}</div>
                    <div>{subtitle}</div>
                </div>
        </div>
  )
}

export default MeetingType