import React from "react";
import Link from "next/link";

const Header = ({ currentUser }) => {
    return (
        <nav>
            <Link href="/">Ticketing</Link>
            <div>
                {currentUser ? (
                    <Link href="/auth/signout">Sign Out</Link>
                ) : (
                    <>
                        <Link href="/auth/signin">Sign In</Link>
                        <Link href="/auth/signup">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Header;