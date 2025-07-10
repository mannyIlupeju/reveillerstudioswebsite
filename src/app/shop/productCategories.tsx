'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchCategories } from '@/utils/fetchCategories/fetchCategories';

type Collection = {
  id: string;
  title: string;
  handle: string;
  updatedAt: string;
};

function ProductCategories() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reversedTitle, setReversedTitle] = useState<string | null>(null);
  const [hoveredID, setHoveredID] = useState<string | null>(null);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        if (!data || data.length === 0) {
          setError('No categories found.');
        } else {
          setCollections(data);
        }
      } catch (err) {
        console.error('Error loading categories:', err);
        setError('Something went wrong while loading categories.');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  function handleMouseEnter(e: React.MouseEvent<HTMLAnchorElement>, id: string, title: string) {
    e.preventDefault();
    const element = e.currentTarget;
    const originalText = title;
    element.setAttribute("data-original-text", originalText);

    const idInterval = setInterval(() => {
      setReversedTitle((prev) =>
        prev === originalText ? originalText.split("").reverse().join("") : originalText
      );
    }, 500);

    setHoveredID(id);
    setIntervalID(idInterval);
  }

  const handleMouseLeave = () => {
    if (intervalID) {
      clearInterval(intervalID);
      setIntervalID(null);
    }
    setHoveredID(null);
    setReversedTitle(null);
  };

  // 🟡 Loading state
  if (loading) {
    return (
      <div className="text-sm text-gray-500 animate-pulse">
        Loading categories...
      </div>
    );
  }

  // 🔴 Error or fallback state
  if (error || collections.length === 0) {
    return (
      <div className="text-sm text-red-500">
        {error || 'No categories to display.'}
      </div>
    );
  }

  // ✅ Main render
  return (
    <div className="flex xl:flex-col justify-center gap-2">
      {collections.map((item) => {
        const { id, title, handle } = item;

        return (
          <Link
            key={id}
            href={`/shop/collections/${handle}`}
            className="orange-hover w-fit p-2 rounded-lg hover:text-zinc-900 text-zinc-800"
            data-original-text={title}
            onMouseEnter={(e) => handleMouseEnter(e, id, title)}
            onMouseLeave={handleMouseLeave}
          >
            <span className="font-semibold uppercase">
              {hoveredID === id && reversedTitle ? reversedTitle : title}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductCategories;
