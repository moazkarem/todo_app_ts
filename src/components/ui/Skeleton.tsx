
const Skeleton = () => {
  return (
    <div>
  <div className="flex items-center justify-between">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-24 mb-2.5"></div>
        </div>
        <div className="space-x-3 flex items-center justify-center">
        <div className="h-9 bg-gray-300 rounded-lg  dark:bg-gray-400 w-20"></div>
        <div className="h-9 bg-gray-300 rounded-lg  dark:bg-gray-400 w-20"></div>
        </div>
   
      </div>
    </div>
  )
}

export default Skeleton;