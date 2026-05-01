"use client";
import { useSession } from 'next-auth/react';
import React from 'react';

const test = () => {
    const session = useSession();
    return (
        <div>
            <div>
                {JSON.stringify(session)}
            </div>
        </div>
    );
};

export default test;