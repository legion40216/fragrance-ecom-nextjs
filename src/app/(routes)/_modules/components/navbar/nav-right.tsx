import React from 'react'
import Cart from './nav-right/cart';
import UserMenu from './nav-right/user-menu';

export default function NavRight() {
  return (
    <div className="flex gap-1 items-center">
      {/* <Logout /> */}

      <UserMenu />

      <Cart />
    </div>
  )
}
