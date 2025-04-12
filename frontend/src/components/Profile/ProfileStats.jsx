export function ProfileStats({ stats }) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-secondary/10 p-4 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">Items Reported</p>
          <p className="text-2xl font-bold">{stats?.totalLostItems}</p>
        </div>
        <div className="bg-secondary/10 p-4 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">Items Found</p>
          <p className="text-2xl font-bold">{stats?.totalFoundItems}</p>
        </div>
      </div>
    );
  }