

export default function HistoryTable() {
  return (
    <div>
      <div className="flex flex-col md:px-[80px] pb-[20px]">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-y-auto rounded-lg md:h-[500px]">
              <table className="min-w-full text-left text-sm font-light border-2 border-slate-20 bg-[#ebebeb]">
                <thead className="border-b font-bold text-primary ">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Notification
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Threat Level
                    </th>
                  </tr>
                </thead>
                <tbody className="font-semibold text-primary">
                  <tr className="border-b transition duration-300 ease-in-out hover:bg-gray-300 ">
                    <td className="whitespace-nowrap px-6 py-4 font-bold">
                      Human Detected
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">2024-10-01</td>
                    <td className="whitespace-nowrap px-6 py-4">00:03:04</td>
                    <td className="whitespace-nowrap px-6 py-4">Medium</td>
                  </tr>

                  <tr className="border-b transition duration-300 ease-in-out hover:bg-gray-300 ">
                    <td className="whitespace-nowrap px-6 py-4 font-bold">
                      Weapon Detected
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">2024-10-01</td>
                    <td className="whitespace-nowrap px-6 py-4">00:03:04</td>
                    <td className="whitespace-nowrap px-6 py-4">Medium</td>
                  </tr>

                  <tr className="border-b transition duration-300 ease-in-out hover:bg-gray-300 ">
                    <td className="whitespace-nowrap px-6 py-4 font-bold">
                      Weapon Detected
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">2024-10-01</td>
                    <td className="whitespace-nowrap px-6 py-4">00:03:04</td>
                    <td className="whitespace-nowrap px-6 py-4">High</td>
                  </tr>

                  <tr className="border-b transition duration-300 ease-in-out hover:bg-gray-300 ">
                    <td className="whitespace-nowrap px-6 py-4 font-bold">
                      Vechile Detected
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">2024-10-01</td>
                    <td className="whitespace-nowrap px-6 py-4">00:03:04</td>
                    <td className="whitespace-nowrap px-6 py-4">Low</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
