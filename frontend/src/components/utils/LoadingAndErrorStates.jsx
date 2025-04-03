function LoadingState() {
    return (
      <div className="container py-8 space-y-4">
        <Skeleton className="h-10 w-[200px]" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-[400px] w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[300px] w-full" />
          </div>
        </div>
      </div>
    )
  }
  
  function ErrorState({ error }) {
    return (
      <div className="container py-8 text-center space-y-4">
        <Alert variant="destructive">
          <AlertTitle>Error loading item</AlertTitle>
          <AlertDescription>
            {error.message || 'Failed to load item details'}
          </AlertDescription>
        </Alert>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )
  }
  
  function NotFoundState() {
    return (
      <div className="container py-8 text-center space-y-4">
        <Alert>
          <AlertTitle>Item Not Found</AlertTitle>
          <AlertDescription>
            The requested item doesn't exist or may have been removed
          </AlertDescription>
        </Alert>
        <Button asChild>
          <Link to="/">Browse All Items</Link>
        </Button>
      </div>
    )
  }