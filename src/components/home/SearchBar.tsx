"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { searchSuggestions } from "@/lib/data";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return searchSuggestions
      .filter((item) => item.label.toLowerCase().includes(lower))
          .slice(0, 8);
  }, [query]);

  const showDropdown = isOpen && query.trim().length > 0;

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showDropdown || filtered.length === 0) {
      if (e.key === "Enter" && filtered.length === 1) {
        window.location.href = filtered[0].href;
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % filtered.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i <= 0 ? filtered.length - 1 : i - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && filtered[activeIndex]) {
          window.location.href = filtered[activeIndex].href;
        } else if (filtered.length === 1) {
          window.location.href = filtered[0].href;
        }
        break;
      case "Escape":
        setIsOpen(false);
        setActiveIndex(-1);
        inputRef.current?.blur();
        break;
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <label htmlFor="site-search" className="sr-only">
        Search for a game or workload
      </label>
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-200/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={inputRef}
          id="site-search"
          type="search"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="search-suggestions"
          aria-activedescendant={
            activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined
          }
          aria-autocomplete="list"
          placeholder="Search a game or workload…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            setTimeout(() => setIsOpen(false), 150);
          }}
          onKeyDown={handleKeyDown}
          className="w-full rounded-xl border border-surface-800 bg-surface-900 py-3.5 pl-12 pr-4 text-base text-white placeholder:text-surface-200/40 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
      </div>

      {showDropdown && (
        <ul
          ref={listRef}
          id="search-suggestions"
          role="listbox"
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-surface-800 bg-surface-900 shadow-xl"
        >
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <li key={item.href} role="option" aria-selected={index === activeIndex}>
                <Link
                  id={`suggestion-${index}`}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                    index === activeIndex
                      ? "bg-brand-600/20 text-white"
                      : "text-surface-200 hover:bg-surface-800"
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <span>{item.label}</span>
                  <span className="text-xs capitalize text-surface-200/50">
                    {item.type}
                  </span>
                </Link>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-sm text-surface-200/50">
              No matches found — try a different search term
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
