import { clsx } from '@mantine/core';
import React, { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

interface LinkProps {
    prev: string;
    next: string;
    first: string;
    last: string;
}

interface LinksMetaProps {
    active: boolean;
    label: string;
    url: string;
}

const Pagination = ({
    currentPage,
    links,
    lastPage,
    linksMeta,
    setUrl,
}: {
    currentPage: number;
    lastPage: number;
    linksMeta: LinksMetaProps[];
    links: LinkProps;
    setUrl: Dispatch<SetStateAction<string>>;
}) => {
    return (
        <div className="col-span-12 h-11 w-full flex text-white ">
            {linksMeta.length > 2 && (
                <div className="h-11 grid w-full grid-cols-12">
                    <div className="col-span-12 h-11 grid md:hidden grid-cols-12">
                        {links.prev ? (
                            <button className="col-span-2 h-full bg-emerald-600 flex justify-center items-center rounded-md text-sm font-medium" onClick={() => setUrl(links.prev)}>
                                <LeftIcon />
                            </button>
                        ) : (
                            <span className="col-span-2 h-full bg-zinc-400/70 rounded-md flex justify-center items-center text-sm font-medium cursor-not-allowed">
                                <LeftIcon />
                            </span>
                        )}
                        {links.next ? (
                            <button className="col-span-2 col-start-11 h-full bg-emerald-600 flex justify-center items-center rounded-md text-sm font-medium" onClick={() => setUrl(links.next)}>
                                <RightIcon />
                            </button>
                        ) : (
                            <span className="col-span-2 col-start-11 h-full bg-zinc-400/70 rounded-md flex justify-center items-center text-sm font-medium cursor-not-allowed">
                                <RightIcon />
                            </span>
                        )}
                    </div>
                    <div className="col-span-12 h-11 md:grid hidden grid-cols-12">
                        {linksMeta.length > 5 ? (
                            <div className="col-span-2">
                                {currentPage <= 2 ? (
                                    <span className="w-full h-full bg-zinc-400/70 rounded-md flex justify-center items-center text-sm font-medium cursor-not-allowed">First</span>
                                ) : (
                                    <button
                                        className="w-full h-full bg-emerald-600 flex justify-center items-center rounded-md text-sm font-medium hover:bg-emerald-700"
                                        onClick={() => setUrl(links.first)}
                                    >
                                        First
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="col-span-2"></div>
                        )}
                        <div className="col-span-8 grid h-11 grid-cols-9">
                            {linksMeta.length > 5 ? (
                                <div className="col-span-9 grid h-11 grid-cols-9">
                                    {currentPage == 1 ? (
                                        <div className="col-span-3 col-start-4 grid gap-x-2 h-11 grid-cols-3">
                                            <span className="col-span-1 place-items-center grid rounded bg-zinc-400/70 cursor-not-allowed">...</span>
                                            {linksMeta.slice(1, currentPage + 2).map((item) => (
                                                <button
                                                    onClick={() => setUrl(item.url)}
                                                    key={item.label}
                                                    className={clsx(item.active ? 'bg-emerald-500' : 'bg-emerald-600', 'col-span-1 place-items-center grid rounded hover:bg-emerald-700')}
                                                >
                                                    {item.label} ==1
                                                </button>
                                            ))}
                                        </div>
                                    ) : currentPage == lastPage ? (
                                        <div className="col-span-3 col-start-4 grid gap-x-2 h-11 grid-cols-3">
                                            {linksMeta.slice(currentPage - 1, currentPage + 1).map((item) => (
                                                <button
                                                    onClick={() => setUrl(item.url)}
                                                    key={item.label}
                                                    className={clsx(item.active ? 'bg-emerald-500' : 'bg-emerald-600', 'col-span-1 place-items-center grid rounded hover:bg-emerald-700')}
                                                >
                                                    {item.label} ==2
                                                </button>
                                            ))}
                                            <span className="col-span-1 place-items-center cursor-not-allowed grid rounded bg-zinc-400/70">...</span>
                                        </div>
                                    ) : (
                                        <div className="col-span-3 col-start-4 grid gap-x-2 h-11 grid-cols-3">
                                            {linksMeta.slice(currentPage - 1, currentPage + 2).map((item) => (
                                                <button
                                                    onClick={() => setUrl(item.url)}
                                                    key={item.label}
                                                    className={clsx(item.active ? 'bg-emerald-500' : 'bg-emerald-600', 'col-span-1 place-items-center grid rounded hover:bg-emerald-700')}
                                                >
                                                    {item.label} ==3
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : linksMeta.length <= 5 ? (
                                <div className="col-span-9 grid h-11 grid-cols-9">
                                    {linksMeta.length == 4 ? (
                                        // page 4
                                        <div className="col-span-12 grid grid-cols-8">
                                            <div className="col-span-2 col-start-4 grid gap-x-5 h-11 grid-cols-2">
                                                {linksMeta.slice(1, lastPage + 1).map((item) => (
                                                    <button
                                                        onClick={() => setUrl(item.url)}
                                                        key={item.label}
                                                        className={clsx(item.active ? 'bg-emerald-500' : 'bg-emerald-600', 'col-span-1 place-items-center grid rounded hover:bg-emerald-700')}
                                                    >
                                                        {item.label} ==4
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        // page 1
                                        <div className="col-span-3 col-start-4 grid gap-x-2 h-11 grid-cols-3">
                                            {linksMeta.slice(1, lastPage + 1).map((item) => (
                                                <button
                                                    onClick={() => setUrl(item.url)}
                                                    key={item.label}
                                                    className={clsx(item.active ? 'bg-emerald-500' : 'bg-emerald-600', 'col-span-1 place-items-center grid rounded hover:bg-emerald-700')}
                                                >
                                                    {item.label} ===0
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : null}
                        </div>
                        {linksMeta.length > 5 ? (
                            <div className="col-span-2 col-start-11">
                                {currentPage > lastPage - 2 ? (
                                    <span className="w-full h-full bg-zinc-400/70 rounded-md flex justify-center items-center text-sm font-medium cursor-not-allowed">Last</span>
                                ) : (
                                    <button
                                        className="w-full h-full bg-emerald-600 flex justify-center items-center rounded-md text-sm font-medium hover:bg-emerald-700"
                                        onClick={() => setUrl(links.last)}
                                    >
                                        Last
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="col-span-2 col-start-11" />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pagination;

function LeftIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
    );
}

function RightIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
    );
}
