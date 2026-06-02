import React from "react";
import Link from "next/link";

const Header = ({ currentUser }) => {
    return (
        <nav className="main-nav">
            <Link href="/" className="brand">
                Ticketing
            </Link>
            <div className="nav-links">
                {currentUser ? (
                    <Link href="/auth/signout" className="nav-link">
                        Sign Out
                    </Link>
                ) : (
                    <>
                        <Link href="/auth/signin" className="nav-link">
                            Sign In
                        </Link>
                        <Link href="/auth/signup" className="nav-link">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Header;