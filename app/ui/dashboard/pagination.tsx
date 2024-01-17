"use client";

import { generatePagination } from "@/app/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: string | number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="flex gap-3 items-center">
      <PaginationArrow
        href={createPageURL(currentPage - 1)}
        direction="left"
        isDisabled={currentPage <= 1}
      />
      <div className="h-2 w-2 bg-zinc-300 rounded-full"></div>
      {allPages.map((page, index) => {
        return (
          <PaginationNumber
            key={page}
            href={createPageURL(page)}
            page={page}
            isActive={currentPage === page}
          />
        );
      })}
      <div className="h-2 w-2 bg-zinc-300 rounded-full"></div>
      <PaginationArrow
        href={createPageURL(currentPage + 1)}
        direction="right"
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
}: {
  page: number | string;
  href: string;
  isActive: boolean;
}) {
  const className = clsx(
    "bg-zinc-300 text-zinc-100 h-8 w-8 rounded-full flex items-center justify-center",
    {
      "bg-zinc-900": isActive,
    }
  );

  return isActive ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(
    "bg-zinc-300 text-zinc-100 h-8 w-8 rounded-full flex items-center justify-center",
    {
      "pointer-events-none text-zinc-100/40": isDisabled,
      "hover:bg-zinc-400": !isDisabled,
    }
  );

  const icon =
    direction === "left" ? (
      <ChevronLeftIcon className="w-5 h-5" />
    ) : (
      <ChevronRightIcon className="w-5 h-5" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
