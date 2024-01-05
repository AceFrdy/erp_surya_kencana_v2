import { clsx } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';

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

interface MetaLinkProps {
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    per_page: number;
    total: number;
}

const Pagination = ({ links, metaLink, linksMeta, setUrl }: { metaLink: MetaLinkProps; linksMeta: LinksMetaProps[]; links: LinkProps; setUrl: Dispatch<SetStateAction<string>> }) => {
    return (
        <div className="flex w-full mt-8 items-center flex-col sm:flex-row gap-y-8">
            <div className="w-full flex flex-col sm:flex-row justify-center items-center sm:justify-start">
                <p>
                    Showing <span>{metaLink.from}</span> to <span>{metaLink.to}</span> of <span>{metaLink.total}</span> entries
                </p>
                <p className="flex">
                    <span className="hidden sm:flex mx-2">-</span> rows per page <span className="ml-1">{metaLink.per_page}</span>
                </p>
            </div>
            <div className="w-full h-9 flex gap-x-2 text-white justify-center sm:justify-end">
                {/* page > 3 */}
                <button
                    onClick={() => setUrl(links.prev)}
                    className={clsx(
                        links.prev ? 'bg-emerald-700 hover:bg-emerald-700' : 'disabled:bg-slate-200 cursor-not-allowed text-slate-400',
                        'w-9 h-9 rounded-full  flex justify-center items-center'
                    )}
                    disabled={!links.prev}
                >
                    <LeftIcon />
                </button>
                {linksMeta.length >= 5 && (
                    <button className={clsx('w-9 h-9 border border-emerald-700/50 text-emerald-700 hidden rounded-full sm:flex justify-center items-center')} disabled>
                        ...
                    </button>
                )}
                {/* page > 3 */}
                {/* ------------------------------ */}
                {/* page 1/2 */}
                {linksMeta.length <= 5 ? (
                    <div className="flex gap-x-2">
                        {linksMeta.slice(1, metaLink.last_page + 1).map((item) => (
                            <button
                                onClick={() => setUrl(item.url)}
                                className={clsx(item.active ? 'bg-emerald-700' : 'bg-emerald-600', ' w-9 h-9 rounded-full  hover:bg-emerald-700 flex justify-center items-center')}
                                key={item.label}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                ) : (
                    // page > 3
                    <div className="h-9 flex gap-x-2 text-white justify-end">
                        {/* page > 3 but current page === 1 */}
                        {metaLink.current_page === 1 ? (
                            <div>
                                {linksMeta.slice(1, metaLink.last_page + 1).map((item) => (
                                    <button
                                        onClick={() => setUrl(item.url)}
                                        className={clsx(item.active ? 'bg-emerald-700' : 'bg-emerald-600', 'w-9 h-9 rounded-full  hover:bg-emerald-700 flex justify-center items-center')}
                                        key={item.label}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            // page > 3 but current page !== 1
                            <div className="h-9 flex gap-x-2 text-white justify-end">
                                {/* page > 3 but current page === last page */}
                                {metaLink.current_page === metaLink.last_page ? (
                                    <div className="h-9 flex gap-x-2 text-white justify-end">
                                        {linksMeta.slice(metaLink.last_page - 1, metaLink.last_page + 1).map((item) => (
                                            <button
                                                onClick={() => setUrl(item.url)}
                                                className={clsx(item.active ? 'bg-emerald-700' : 'bg-emerald-600', 'w-9 h-9 rounded-full  hover:bg-emerald-700 flex justify-center items-center')}
                                                key={item.label}
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="h-9 flex gap-x-2 text-white justify-end">
                                        {/* page > 3 but current page !== last page || current page !== 1 */}
                                        {linksMeta.slice(metaLink.current_page - 1, metaLink.current_page + 1).map((item) => (
                                            <button
                                                onClick={() => setUrl(item.url)}
                                                className={clsx(item.active ? 'bg-emerald-700' : 'bg-emerald-600', 'w-9 h-9 rounded-full  hover:bg-emerald-700 flex justify-center items-center')}
                                                key={item.label}
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
                {/* page > 3 */}
                {linksMeta.length >= 5 && (
                    <button className={clsx('w-9 h-9 rounded-full border border-emerald-700/50 text-emerald-700 hidden sm:flex justify-center items-center')} disabled>
                        ...
                    </button>
                )}
                <button
                    onClick={() => setUrl(links.next)}
                    className={clsx(
                        links.next ? 'bg-emerald-700 hover:bg-emerald-700' : 'disabled:bg-slate-200 cursor-not-allowed text-slate-400',
                        'w-9 h-9 rounded-full  flex justify-center items-center'
                    )}
                    disabled={!links.next}
                >
                    <RightIcon />
                </button>
            </div>
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
