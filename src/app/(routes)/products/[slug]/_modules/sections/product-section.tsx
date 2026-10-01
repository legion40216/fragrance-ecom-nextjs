"use client";
import React, { useState } from 'react';
import { products } from '@/data/data';
import Image from 'next/image';

import ProductDetails from '../components/product-details';
import { ProductType } from '@/types/types';

interface ProductSectionProps {
  product: ProductType;
}

export default function ProductSection({ product }: ProductSectionProps) {

  return (
    <div className='grid md:grid-cols-2 gap-8'>
      {/* Left Side - Images */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className='aspect-square relative w-full rounded-lg 
              overflow-hidden border border-gray-200'
        >
          <Image 
            src={product.images[0]} 
            alt={product.name}
            // fill
            // className="object-cover"
            // priority
          />
        </div>

        {/* Thumbnail Gallery */}
        {imageGallery.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {
              return (
                <button
                  key={index}
                  title={}
                  onClick={}
                  disabled={}
                  aria-label={}
                  className={`
                    aspect-square relative rounded-md overflow-hidden border-2 
                    transition-all hover:border-gray-400 p-0
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-ring
                    focus-visible:ring-offset-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${img === mainImage ? 'border-black ring-2 ring-black' : 'border-gray-200'}
                  `}
                >
                  <Image 
                    src={}
                    alt={}
                    // fill
                    // className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Right Side - Product Details */}
      <div>
        <ProductDetails
          product={product}
        />
      </div>
    </div>
  );
}