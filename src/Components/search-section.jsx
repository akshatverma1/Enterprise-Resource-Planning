import { Input } from "./ui/input"
import { Button } from "./ui/button"

export function SearchSection() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h2 className="mb-6 text-3xl font-bold text-white">What are you looking for?</h2>
      <div className="flex w-full max-w-md items-center space-x-2">
        <Input type="text" placeholder="Search" className="bg-white text-black placeholder:text-gray-500" />
        <Button className="bg-green-500 hover:bg-green-600">Search</Button>
      </div>
    </div>
  )
}
