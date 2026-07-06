function AuthLoaderSkeleton() {
    return (
        <div className="min-h-screen bg-app flex flex-col">
            {/* Navbar Skeleton */}
            <div className="h-16 border-b border-border flex items-center justify-between px-6 md:px-12 animate-pulse bg-tertiary">
                <div className="h-6 w-28 bg-border rounded"></div>
                <div className="flex gap-6">
                    <div className="h-4 w-16 bg-border rounded"></div>
                    <div className="h-4 w-20 bg-border rounded"></div>
                </div>
                <div className="h-8 w-8 rounded-full bg-border"></div>
            </div>

            {/* Main Content Skeleton */}
            <div className="flex-grow max-w-7xl w-full mx-auto px-6 md:px-12 py-12 space-y-8 animate-pulse">
                <div className="space-y-3">
                    <div className="h-8 w-64 bg-border rounded"></div>
                    <div className="h-4 w-96 bg-border rounded"></div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-card border border-border shadow-md rounded-xl p-6 space-y-4"
                        >
                            <div className="h-5 w-2/3 bg-border rounded"></div>
                            <div className="h-12 w-12 rounded bg-border"></div>
                            <div className="space-y-2">
                                <div className="h-3 w-full bg-border rounded"></div>
                                <div className="h-3 w-5/6 bg-border rounded"></div>
                            </div>
                            <div className="h-8 w-full bg-border rounded mt-4"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AuthLoaderSkeleton;
