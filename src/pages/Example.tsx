import { DatePickerDemo } from "@/components/DatePickerDemo"
import { Header } from "@/components/Header"
import { PaginationTable } from "@/components/PaginationTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"

export default function Example() {
  const [resp, setResp] = useState<any>({ bikes: [] });
  const [loading, setloading] = useState<boolean>(true);
  const fetchBikes = useMemo(() => async () => {
    const url = "https://bikeindex.org:443/api/v3/search?page=1&per_page=18&location=PortugalP&distance=20&stolenness=stolen";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      setResp({ bikes: json.bikes });
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setloading(false);
    }

  }, [])

  useEffect(() => {
    fetchBikes();
  }, [])


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Header />
      <div className="flex items-center justify-between">
        <form className="flex items-center gap-2 py-6">
          <Input name="id" placeholder="Search case description" />
          <DatePickerDemo text="from" />
          <DatePickerDemo text="to" />
          <Button type='submit'>Find Cases</Button>
        </form>
      </div>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <>
          <div className="border rounded-lg p-2">
            <Table>
              <TableBody>
                {resp.bikes.map((bike: any) => {
                  var datetime = new Date(bike.date_stolen * 1000);
                  return (
                    <TableRow key={bike.id}>
                      <TableCell><img className="max-h-full w-96" src={bike.large_img || 'https://demofree.sirv.com/nope-not-here.jpg?w=150'} alt="" /></TableCell>
                      <TableCell className="text-sm font-medium text-gray-900"><Link to={`/cases/${bike.id}`}>{`${bike.title}(${bike.frame_colors[0]})`}</Link></TableCell>
                      <TableCell className="text-sm text-gray-500">{bike.description}</TableCell>
                      <TableCell className="text-sm text-gray-500">{datetime.toDateString()} - {bike.stolen_location}</TableCell>
                    </TableRow>
                  )
                }
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center py-2 w-full">
            <PaginationTable />
          </div>
        </>
      )}
    </div>
  )
}