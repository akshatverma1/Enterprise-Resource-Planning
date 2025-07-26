import { Link } from "react-router-dom"

export default function navbar() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link to="/" className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-bold sm:inline-block">Application / Dashboard</span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        <Link to="/" className="flex items-center text-sm font-medium text-muted-foreground">
          Home
        </Link>
        <Link to="/product" className="flex items-center text-sm font-medium text-muted-foreground">
          Products
        </Link>
        <Link to="/settings" className="flex items-center text-sm font-medium text-muted-foreground">
          Settings
        </Link>
      </nav>
    </div>
  )
}
