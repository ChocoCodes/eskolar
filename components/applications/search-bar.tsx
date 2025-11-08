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
      <div className="grid grid-cols-10 gap-4 items-center">
        {/* Search Input */}
        <InputGroup className="col-span-8 ring-1 ring-gray-outline">
          <InputGroupInput
            placeholder="Search by program name, provider, or type..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
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
        <InputGroup className="col-span-1 ring-1 ring-gray-outline flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton
                variant="ghost"
                className="text-sm text-muted-foreground w-full flex justify-between h-full"
              >
                {displayStatus} <ChevronDownIcon className="size-3" />
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
          className="text-muted-foreground ring-1 !ring-gray-outline flex justify-center gap-2"
          onClick={() => alert("Advanced Filters coming soon!")}
        >
          <FaFilter className="size-3" />
          Advanced Filters
        </Button>
      </div>
    </Container>
  );
}

export default SearchBar;
