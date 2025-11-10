import React from "react";
import Container from "@/components/ui/container";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FaFilter } from "react-icons/fa";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: string | null;
  onStatusChange: (status: string | null) => void;
}

function SearchBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: SearchBarProps) {
  const displayStatus = statusFilter ?? "All";

  const handleStatusChange = (status: string) => {
    onStatusChange(status === "All" ? null : status);
  };

  return (
    <Container className="mt-8">
      <div className="grid grid-cols-10 gap-4 items-center sm:grid-cols-12">
        {/* Search Input */}
        <InputGroup className="col-span-10 sm:col-span-10 ring-1 ring-gray-outline">
          <InputGroupInput
            placeholder="Search by program name, provider, or type..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="truncate w-full"
          />
          <InputGroupAddon
            role="button"
            aria-label="Search"
            className="cursor-pointer"
          >
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        {/* Status Filter */}
        <InputGroup className="col-span-5 sm:col-span-1 ring-1 ring-gray-outline flex min-w-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton
                variant="ghost"
                className="text-sm text-muted-foreground w-full flex justify-between h-full truncate"
              >
                <span className="truncate">{displayStatus}</span>
                <ChevronDownIcon className="size-3 shrink-0 ml-1" />
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="[--radius:0.95rem]">
              {["All", "Completed", "Under Review", "Submitted"].map(
                (status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => handleStatusChange(status)}
                  >
                    {status}
                  </DropdownMenuItem>
                ),
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroup>

        {/* Advanced Filters */}
        <Button
          variant="outline"
          className="col-span-5 sm:col-span-1 text-muted-foreground ring-1 !ring-gray-outline flex justify-center items-center gap-2 truncate"
          onClick={() => alert("Advanced Filters coming soon!")}
        >
          <FaFilter className="size-3 shrink-0" />
          <span className="truncate">Advanced Filters</span>
        </Button>
      </div>
    </Container>
  );
}

export default SearchBar;
